import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sparkam Auto-Publisher | One-Tap IG Publishing & CRM',
  description: 'One-tap Instagram business publisher and CRM for @sparkam.media and @zeeteroliver in Abuja WAT with Meta AI webhook and Google Sheets sync.',
  openGraph: {
    title: 'Sparkam Auto-Publisher | One-Tap IG Publishing & CRM',
    description: 'One-tap Instagram business publisher and CRM for @sparkam.media and @zeeteroliver in Abuja WAT with Meta AI webhook and Google Sheets sync.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#000000] text-[#ffffff] antialiased">
        {children}
      </body>
    </html>
  );
}
