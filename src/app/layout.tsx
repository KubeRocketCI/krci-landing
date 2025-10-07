import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const font = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KubeRocketCI - Build your delivery rocket",
  description:
    "Boost your delivery with the development culture based on the modern CI/CD stack, golden path and self-service capabilities of the KubeRocketCI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className="overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
