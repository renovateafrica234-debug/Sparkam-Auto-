import { Providers } from "./providers";

export const metadata = {
  title: "Sparkam Auto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
