import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'ACME Workshop - Slides',
  description: 'ACME Workshop Slides',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
