import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PRaise',
  description: 'author: Clinton Fernandes',
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
            <h1 className="text-white my-3">PRaise</h1>
          </header>
          <main className="main">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
