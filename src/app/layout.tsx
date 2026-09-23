import type { Metadata } from 'next';
import { Cinzel, Inter, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import { Marquee } from '@/components/site/Marquee';
import { ShlokaMarquee } from '@/components/site/ShlokaMarquee';
import { TopBar } from '@/components/site/TopBar';
import { NavBar } from '@/components/site/NavBar';
import { Footer } from '@/components/site/Footer';
import { SCHOOL, ANNOUNCEMENTS } from '@/lib/content';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${SCHOOL.name} — ${SCHOOL.location}, ${SCHOOL.district}, ${SCHOOL.state}`,
    template: `%s · ${SCHOOL.name}`,
  },
  description: `National High School, Bagodar (est. 2021) — Nursery to Class 10, English medium, CBSE / JAC pattern. Smart classrooms, separate hostel, school bus. Free for orphan children.`,
  applicationName: SCHOOL.name,
  authors: [{ name: SCHOOL.name }],
  keywords: [
    'National High School Bagodar',
    'CBSE school Giridih',
    'JAC school Bagodar',
    'best school Aura Dama',
    'hostel school Jharkhand',
    'free education orphan children',
  ],
  openGraph: {
    title: SCHOOL.name,
    description: 'Nursery to Class 10, English medium, CBSE / JAC pattern. Bagodar, Giridih.',
    type: 'website',
    locale: 'en_IN',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-nav.png',    sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Marquee items={ANNOUNCEMENTS} />
        <ShlokaMarquee />
        <TopBar />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}