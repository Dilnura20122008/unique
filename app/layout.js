import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata = {
  title: "Unique Service — Premium Avto Xizmat",
  description:
    "Mashina yuvish, salon tozalash, polirovka, keramika qoplama, tonirovka va barcha avto xizmatlar bitta maskanda — Unique Service.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
