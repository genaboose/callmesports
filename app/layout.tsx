export const metadata = {
  title: "CallMeSports",
  description: "Your coach on call — human or AI.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/favicon-180x180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// app/layout.tsx
export const metadata = {
  title: "CallMeSports",
  description: "Your coach on call — human or AI.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/favicon-180x180.png", sizes: "180x180" }]
  },
  manifest: "/manifest.webmanifest",
};

import "../styles/globals.css";
import PWARegister from "./components/PWARegister";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
