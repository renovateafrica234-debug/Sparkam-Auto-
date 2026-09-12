export const metadata = {
  title: 'Sparkam Auto',
  description: 'Sparkam Auto Live - App ID 1408305487572055',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#000', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
