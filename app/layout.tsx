import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DoorDash AM Growth Copilot",
  description: "Source-grounded merchant growth decision support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
