import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Suraj Rawat - Full Stack Developer',
    template: '%s | Suraj Rawat',
  },
  description:
    'Web developer specializing in React, Next.js, and MERN Stack development. Building fast, scalable, and user-focused web applications.',
  keywords: [
    'Suraj Rawat',
    'Web Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'JavaScript',
    'MERN Stack',
    'Portfolio',
  ],
  authors: [
    {
      name: 'Suraj Rawat',
    },
  ],
  creator: 'Suraj Rawat',
  metadataBase: new URL('https://surajrawatportfoliowebsite.vercel.app'),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'Suraj Rawat - Full Stack Developer',
    description:
      'Portfolio of Suraj Rawat, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    url: 'https://surajrawatportfoliowebsite.vercel.app',
    siteName: 'Suraj Rawat Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suraj Rawat - Full Stack Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suraj Rawat - Full Stack Developer',
    description:
      'Portfolio of Suraj Rawat, Full Stack Developer specializing in MERN stack, Next.js, and polished web experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

