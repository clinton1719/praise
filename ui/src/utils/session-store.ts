'use server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

type SessionId = string;

/* Retreiving session ID starts*/
export async function getSessionId(): Promise<string | undefined> {
  await kv.set('user_1_session', 'session_token_value');
  const cookieStore = cookies();
  return cookieStore.get('session-id')?.value;
}

async function setSessionId(sessionId: SessionId): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set('session-id', sessionId);
}

export async function getSessionIdAndCreateIfMissing(): Promise<
  string | undefined
> {
  await kv.set('user_1_session', 'session_token_value');
  const sessionId = await getSessionId();
  if (!sessionId) {
    const newSessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    await setSessionId(newSessionId);

    return newSessionId;
  }

  return sessionId;
}
/* Retreiving session ID ends*/

/* Setting and Getting values from store starts */
export async function getSessionValue(
  key: string,
  namespace: string = ''
): Promise<object | undefined | null> {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return kv.hget(`session-${namespace}-${sessionId}`, key);
}

export async function getAllSessionValues(
  namespace: string = ''
): Promise<Record<string, unknown> | null> {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return kv.hgetall(`session-${namespace}-${sessionId}`);
}

export async function setSessionValue(
  key: string,
  value: object | null,
  namespace: string = ''
): Promise<number> {
  const sessionId = await getSessionIdAndCreateIfMissing();
  return kv.hset(`session-${namespace}-${sessionId}`, { [key]: value });
}

/* Setting and Getting values from store ends */
