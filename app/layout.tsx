import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tử Vi Đẩu Số - Tra Cứu & Luận Giải Lá Số Tử Vi Nam Phái",
  description: "Lập lá số Tử Vi Đẩu Số chuẩn xác theo thuật toán truyền thống Việt Nam (Nam Phái) với hơn 140 sao và 12 cung số.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
