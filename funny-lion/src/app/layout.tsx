import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucky Roulette | 행운의 룰렛",
  description: "16조각 룰렛 - 당신의 행운을 시험해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
