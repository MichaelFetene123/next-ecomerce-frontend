import type { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { CartDrawer } from "@/components/cart/cart-drawer";

export const metadata: Metadata = {
  title: "Storefront - Next.js Ecommerce",
  description: "Modern full-stack ecommerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
