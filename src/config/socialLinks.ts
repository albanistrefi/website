export const socialLinks = {
  github: 'https://github.com/albanistrefi',
  linkedin: 'https://www.linkedin.com/in/alban-istrefi/',
  email: 'mailto:albanistrefi.b@gmail.com',
  x: 'https://x.com/albaistx'
} as const;

export type SocialLinks = Partial<Record<keyof typeof socialLinks, string>>;

export const socialIconClass =
  'text-text-secondary hover:text-accent-primary transition-all duration-200 inline-flex items-center p-1 -m-1 transform-gpu hover:-translate-y-0.5 hover:scale-[1.05] hover:rotate-[4deg] hover:drop-shadow-[0_6px_18px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary rounded';
