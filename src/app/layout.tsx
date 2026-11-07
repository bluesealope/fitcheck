import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { FitCheckProvider } from '@/context/FitCheckContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FITCHECK — Discover Your Style. Define Your Look.',
  description:
    'Personal Fashion Analyzer & Digital Wardrobe for Men and Women. Analyze outfits, explore 49+ fashion styles, discover your 12-season personal color palette, and manage your digital wardrobe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F7F5F0] text-[#252525] antialiased selection:bg-[#252525] selection:text-[#F7F5F0]">
        <FitCheckProvider>{children}</FitCheckProvider>
      </body>
    </html>
  );
}

