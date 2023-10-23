import Link from 'next/link';

export default function Home() {
  return (
    <div className="action">
      <Link className="actionItem" href="/add_repo">
        Add Repo
      </Link>
      <Link className="actionItem" href="/">
        View PR&apos;s
      </Link>
    </div>
  );
}
