import type { Metadata, Viewport } from "next";
import { ThemeProvider } from '@/contexts/ThemeContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuitionly - Because Every Student Learns Differently",
  description: "AI-powered personalized tutoring that adapts to your unique learning style, memory type, and pace. Get step-by-step solutions and interactive lessons.",
  keywords: "AI tutoring, personalized learning, online education, homework help, adaptive learning",
  authors: [{ name: "Tuitionly" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
