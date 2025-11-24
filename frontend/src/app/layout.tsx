import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weather and Book App',
  description: 'Check weather and manage books',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
