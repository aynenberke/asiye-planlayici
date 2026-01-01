import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Asiye'nin Planı",
  description: 'Premium YKS çalışma uygulaması - Deep Work mode',
  manifest: '/manifest.json',
  themeColor: '#ec4899',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Asiye'nin Planı",
  },
  icons: {
    apple: '/icon-192.png',
  },
  openGraph: {
    title: "Asiye'nin Planı",
    description: 'Premium YKS çalışma uygulaması',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

