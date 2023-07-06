import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "获取B站视频封面",
  description: "获取B站视频封面",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
