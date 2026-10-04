export const site = {
  name: 'Suraj Rawat',
  firstName: 'Suraj',
  lastName: 'Rawat',
  handle: 'surajrwt07',
  brand: 'surajrawat.dev',
  email: 'rawatsuraj80627@gmail.com',
  location: 'Haldwani, India',
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
  url: 'https://surajrawatportfoliowebsite.vercel.app/',
  tagline: 'Full Stack Developer crafting fast, expressive web experiences.',
  roles: [
    'Full Stack Developer',
    'React & Next.js Engineer',
    'MERN Stack Developer',
    'Open to Work Worldwide',
  ],
} as const;

export type SocialKey = 'github' | 'linkedin' | 'leetcode' | 'instagram';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  github: { label: 'GitHub', href: 'https://github.com/SurajRawatr07' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suraj-rawat-30513b340/' },
  leetcode: { label: 'LeetCode', href: 'https://leetcode.com/u/SurajRawat07/' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/surajrwt07_' },
};

export const socialList: Array<{ label: string; href: string }> = [
  socials.github,
  socials.linkedin,
  socials.leetcode,
];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
