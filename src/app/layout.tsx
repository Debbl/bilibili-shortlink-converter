import "./globals.css";

export const metadata = {
  title: "获取B站短链接",
  description: "获取B站短链接",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
