import kittyRhythm from '../assets/kitty-rhythm-td.webp';
import propertyCollector from '../assets/property-collector.webp';
import tinySports from '../assets/tiny-sports.webp';

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  url: string;
  host: 'steam' | 'itch.io';
  tags: string[];
  flagship?: boolean;
}

export interface Experience {
  /** Short fake commit hash, shown in the TTY `git log` view. */
  hash: string;
  role: string;
  company: string;
  start: string;
  /** `null` means the role is ongoing. */
  end: string | null;
  description: string;
}

export interface ContactLink {
  key: 'github' | 'gitlab' | 'linkedin' | 'email';
  label: string;
  value: string;
  url: string;
}

export const profile = {
  name: 'Gabriel Gargur',
  handle: 'gabriel',
  host: 'farbeyond',
  role: 'Game developer',
  studio: 'Far Beyond Studios',
  nowBuilding: 'Kitty Rhythm TD',
  careerStart: '03/2021',
  githubUser: 'Ggargur',
};

export const projects: Project[] = [
  {
    slug: 'kitty-rhythm-td',
    title: 'Kitty Rhythm TD',
    description: 'A musical tower defense game. Place your cats, keep the beat and hold the line.',
    image: kittyRhythm,
    url: 'https://store.steampowered.com/app/3213680/Kitty_Rhythm_TD/',
    host: 'steam',
    tags: ['Tower defense', 'Rhythm', 'Unity'],
    flagship: true,
  },
  {
    slug: 'property-collector',
    title: 'Property Collector',
    description: 'A card game about intellectual properties.',
    image: propertyCollector,
    url: 'https://pepeco.itch.io/property-collector',
    host: 'itch.io',
    tags: ['Card game'],
  },
  {
    slug: 'tiny-sports',
    title: 'Tiny Sports',
    description: 'Sports-themed microgames that last a few seconds each.',
    image: tinySports,
    url: 'https://pepeco.itch.io/tiny-sports',
    host: 'itch.io',
    tags: ['Microgames'],
  },
];

/** Ongoing roles first, then most recently ended. */
export const experiences: Experience[] = [
  {
    hash: 'f4b8e1c',
    role: 'Founder',
    company: 'Far Beyond Studios',
    start: '04/2023',
    end: null,
    description: 'Currently making Kitty Rhythm TD.',
  },
  {
    hash: '3d1a9b0',
    role: 'Frontend Developer',
    company: 'Mindsim',
    start: '08/2023',
    end: '06/2024',
    description: 'Worked on a data-oriented dashboard in Java Swing and PostgreSQL.',
  },
  {
    hash: 'c45a2e7',
    role: 'Unity VR Developer',
    company: 'Casa da Descoberta',
    start: '03/2021',
    end: '12/2023',
    description: 'Made science-themed VR experiences.',
  },
  {
    hash: '9b0e3f2',
    role: 'Unity Developer',
    company: 'Play Our Games',
    start: '05/2022',
    end: '01/2023',
    description: 'Developed hypercasual mobile games.',
  },
];

export const skills: Record<string, string[]> = {
  'Game dev': ['Unity', 'C#', 'C'],
  Web: ['Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  Other: ['Java', 'Git'],
};

export const skillCount = Object.values(skills).flat().length;

export const links: ContactLink[] = [
  { key: 'github', label: 'GitHub', value: 'github.com/Ggargur', url: 'https://github.com/Ggargur' },
  { key: 'gitlab', label: 'GitLab', value: 'gitlab.com/Ggargur', url: 'https://gitlab.com/Ggargur' },
  { key: 'linkedin', label: 'LinkedIn', value: 'in/tavares-gargur', url: 'https://linkedin.com/in/tavares-gargur' },
  { key: 'email', label: 'Email', value: 'tavares.gargur@gmail.com', url: 'mailto:tavares.gargur@gmail.com' },
];

export const email = links.find((l) => l.key === 'email')!.value;

export function period(e: Experience): string {
  return `${e.start} – ${e.end ?? 'present'}`;
}
