import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// フォントの設定
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// メタデータ
export const metadata: Metadata = {
  title: "REST API作成テスト",
  description: "Node.jsを使ったRESTfulなAPIの作成練習",
};

// ルートレイアウト
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
