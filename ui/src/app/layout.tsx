import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './footer';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PRaise',
  description: 'author: Clinton Fernandes',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav></nav>
        <div className="body">
          <header>
            <Link href="/">
              <h1 className="my-2 px-2 py-2 mt-4 border-4 border-text rounded-lg text-white border-white hover:text-[#3e3e42] hover:bg-white">
                PRaise
              </h1>
            </Link>
          </header>
          <main className="main">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
