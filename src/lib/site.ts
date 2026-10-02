export const site = {
  name: 'Aitezaz Sikandar',
  firstName: 'Aitezaz',
  lastName: 'Sikandar',
  handle: 'aitezazdev',
  brand: 'aitezaz.dev',
  email: 'aitezazsikandar@gmail.com',
  location: 'Pakistan',
  timeZone: 'Asia/Karachi',
  timeZoneLabel: 'PKT',
  url: 'https://aitezazdev.vercel.app',
  tagline: 'Full Stack Developer crafting fast, expressive web experiences.',
  roles: [
    'Full Stack Developer',
    'React & Next.js Engineer',
    'MERN Stack Developer',
    'Open to Work Worldwide',
  ],
} as const;

export type SocialKey = 'github' | 'linkedin' | 'instagram' | 'source';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  github: { label: 'GitHub', href: 'https://github.com/SurajRawatr07' },
  linkedin: { label: 'Linkedin', href: 'https://www.linkedin.com/in/suraj-rawat-30513b340/' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/surajrwt07_' },
  source: { label: 'Source Code', href: 'https://github.com/SurajRawatr07' },
};

export const socialList: Array<{ label: string; href: string }> = [
  socials.linkedin,
  socials.instagram,
  socials.github,
  socials.source,
];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
