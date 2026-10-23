import type { Metadata } from 'next';
import { Archivo_Black, Space_Grotesk } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { GlobalLoading } from '@/components/layout/GlobalLoading';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ASSET_PATHS } from '@/constants';
import { assetPath } from '@/lib/asset';

import '@/styles/globals.css';

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-head',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Guilherme Gonçalves — Software Engineer',
    template: '%s | Guilherme Gonçalves',
  },
  description:
    'Personal page of Guilherme Gonçalves — software engineer, mathematician and teacher. Event-driven architectures, workflow engines, complexity analysis.',
  authors: [{ name: 'Guilherme Gonçalves' }],
  icons: {
    icon: [{ url: assetPath(ASSET_PATHS.favicon), type: 'image/svg+xml' }],
    shortcut: assetPath(ASSET_PATHS.favicon),
    apple: assetPath(ASSET_PATHS.favicon),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} flex min-h-screen flex-col`}
      >
        <ThemeProvider>
          <GlobalLoading />
          <Header />
          <main className="flex-1 px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
