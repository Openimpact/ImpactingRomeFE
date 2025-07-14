import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impacting Rome",
  description: "Impacting Rome è un progetto d'innovazione sociale, un ecosistema digitale al servizio di una migliore e moderna fruizione della cultura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-white " + dmsans.className}>{children}</body>
    </html>
  );
}
