import type { Metadata } from "next";
import localFont from "next/font/local";

const font = localFont({
  src: [
    {
      path: "../../public/assets/fonts/ArticulatCF-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ArticulatCF-Normal.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "Muse.ai",
  description: "Techical Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} id="root">
        {children}
      </body>
    </html>
  );
}
