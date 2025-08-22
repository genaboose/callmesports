export const metadata = {
  title: "CallMeSports",
  description: "Your coach on call — human or AI.",
};
import "../styles/globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
