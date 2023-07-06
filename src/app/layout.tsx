import type { Metadata } from "next";
import NavList from "~/components/NavList";
import "./globals.css";

export const metadata: Metadata = {
  title: "获取B站短链接",
  description: "获取B站短链接",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <NavList />
        <div>{children}</div>
      </body>
    </html>
  );
}
