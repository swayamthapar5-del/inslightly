import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

export const metadata: Metadata = {
  title: "InsightExchange",
  description: "Exchange feedback for real rewards"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} bg-haze text-ink antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
