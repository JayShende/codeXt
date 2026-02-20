import type { Metadata } from "next";
import "./globals.css";
import { TanstackProvider } from "@/components/tasnstack-provider";
import StoreProvider from "@/redux/StoreProvider";
import { Host_Grotesk, Onest } from "next/font/google";
import { getAuthSession } from "@/lib/auth-session";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const host_grotesk = Host_Grotesk({
  subsets: ["latin"],
  // Load multiple weights for the display font
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--display-family",
});

const onest = Onest({
  subsets: ["latin"],
  // Load multiple weights for the body text
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--text-family",
});

export const metadata: Metadata = {
  title: "CodeXT",
  description: "Share Code On The GO !!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${host_grotesk.variable} ${onest.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <StoreProvider session={session}>{children}</StoreProvider>
            <Toaster position="top-center" />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
