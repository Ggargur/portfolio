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
  /** Short highlight shown above the title (awards, status). */
  badge?: string;
  flagship?: boolean;
}

export type Track = 'games' | 'web';

export interface Experience {
  /** Short fake commit hash, shown in the TTY `git log` view. */
  hash: string;
  role: string;
  company: string;
  track: Track;
  start: string;
  /** `null` means the role is ongoing. */
  end: string | null;
  points: string[];
}

export interface ContactLink {
  key: 'github' | 'itch' | 'linkedin' | 'gitlab' | 'email';
  label: string;
  value: string;
  url: string;
}

export const profile = {
  name: 'Gabriel Gargur',
  fullName: 'Gabriel Tavares Gargur',
  handle: 'gabriel',
  host: 'gg',
  role: 'Game developer · C# programmer',
  location: 'Rio de Janeiro, Brazil',
  careerStart: '03/2021',
  githubUser: 'Ggargur',
  now: {
    role: 'Lead Programmer',
    company: 'Darkside',
    project: 'Unannounced 2.5D metroidvania',
    detail: 'Mugen-style fighting mechanics · 4-person programming team',
  },
  dayJob: { role: 'Clojure Developer', company: 'BuzzLabs' },
};

export const projects: Project[] = [
  {
    slug: 'kitty-rhythm-td',
    title: 'Kitty Rhythm TD',
    description:
      'A 3D rhythm and tower-defense hybrid. I co-led it from a game jam prototype to its Steam page.',
    image: kittyRhythm,
    url: 'https://store.steampowered.com/app/3213680/Kitty_Rhythm_TD/',
    host: 'steam',
    tags: ['3D', 'Rhythm', 'Tower defense', 'Unity'],
    badge: '3× winner · Game Jam Plus 2023–24',
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
    hash: 'a7c31d9',
    role: 'Lead Programmer',
    company: 'Darkside',
    track: 'games',
    start: '04/2026',
    end: null,
    points: [
      'Lead a 4-person programming team on an unannounced (NDA) 2.5D metroidvania with Mugen-style fighting mechanics.',
      'Own gameplay architecture and technical direction; coordinate implementation across the team.',
    ],
  },
  {
    hash: 'e02b4f6',
    role: 'Clojure Developer',
    company: 'BuzzLabs',
    track: 'web',
    start: '04/2026',
    end: null,
    points: [
      'Build features end to end in Clojure (backend) and ClojureScript (frontend).',
      'Model and query data with Datomic, using Datalog.',
    ],
  },
  {
    hash: '3d1a9b0',
    role: 'Web Developer',
    company: 'Mindsim',
    track: 'web',
    start: '04/2026',
    end: '07/2026',
    points: [
      'Migrated a legacy Java application to a React frontend and a Spring Boot backend.',
      'Implemented micro-frontends with Module Federation, so modules could be built and deployed independently.',
      'Built interfaces with React and Bootstrap.',
    ],
  },
  {
    hash: '5f9c0e2',
    role: 'Unity Developer',
    company: 'Mega Cat Studios',
    track: 'games',
    start: '08/2025',
    end: '02/2026',
    points: [
      'Worked on God of War: Sons of Sparta, fixing gameplay bugs and implementing area mechanics on a shipped console title.',
      'Collaborated with a remote, international team under production deadlines.',
    ],
  },
  {
    hash: 'f4b8e1c',
    role: 'Lead Developer',
    company: 'Kitty Rhythm TD',
    track: 'games',
    start: '04/2023',
    end: '10/2025',
    points: [
      'Co-led development of a 3D rhythm / tower-defense hybrid from jam prototype to its Steam page.',
      'Winner at Game Jam Plus 2023–24: Best 3D Game, Best PC/Console Game and Best Pitch.',
    ],
  },
  {
    hash: 'b81d7a3',
    role: '.NET Intern',
    company: 'TIPlan',
    track: 'web',
    start: '09/2024',
    end: '08/2025',
    points: [
      'Built user interfaces with Razor, Vue and Bootstrap on a .NET backend.',
      'Worked with data access through Entity Framework.',
    ],
  },
  {
    hash: 'c45a2e7',
    role: 'VR Developer',
    company: 'Casa da Descoberta (UFF)',
    track: 'games',
    start: '03/2021',
    end: '12/2023',
    points: [
      'Built and shipped 4 VR educational games and interactive exhibits for a public science museum, used by 30+ visitors weekly.',
      'Contributed game design and graphic design beyond the code.',
    ],
  },
  {
    hash: '9b0e3f2',
    role: 'Game Programmer',
    company: 'Play Our Games',
    track: 'games',
    start: '05/2022',
    end: '02/2023',
    points: ['Implemented physics-based mechanics for hyper-casual mobile games in Unity.'],
  },
];

export const tracks: Record<Track, string> = { games: 'Games', web: 'Web' };

export const skills: Record<string, string[]> = {
  'Engines & tools': ['Unity', 'Godot 4', 'VR', 'Qt', 'Git', 'Linux'],
  Languages: ['C#', 'C', 'C++', 'Java', 'JavaScript', 'Clojure', 'ClojureScript', 'Python', 'Go', 'SQL'],
  'Web & backend': ['React', 'Vue', 'Razor', 'Bootstrap', 'Module Federation', 'Spring Boot', '.NET', 'Entity Framework', 'Datomic', 'Flutter'],
};

export const skillCount = Object.values(skills).flat().length;

export const awards = [
  {
    event: 'Game Jam Plus 2023–24',
    project: 'Kitty Rhythm TD',
    prizes: ['Best 3D Game', 'Best PC/Console Game', 'Best Pitch'],
  },
];

export const education = [
  { title: 'B.Sc. Computer Science', place: 'Universidade Federal Fluminense (UFF)' },
  { title: 'Online courses', place: 'Alura · C# OOP, Game Development with Unity' },
];

export const spokenLanguages: [string, string][] = [
  ['Portuguese', 'Native'],
  ['English', 'Fluent'],
  ['German', 'Basic'],
  ['Japanese', 'Basic'],
];

export const links: ContactLink[] = [
  { key: 'github', label: 'GitHub', value: 'github.com/Ggargur', url: 'https://github.com/Ggargur' },
  { key: 'itch', label: 'itch.io', value: 'tavareschan.itch.io', url: 'https://tavareschan.itch.io' },
  { key: 'linkedin', label: 'LinkedIn', value: 'in/tavares-gargur', url: 'https://linkedin.com/in/tavares-gargur' },
  { key: 'gitlab', label: 'GitLab', value: 'gitlab.com/Ggargur', url: 'https://gitlab.com/Ggargur' },
  { key: 'email', label: 'Email', value: 'tavares.gargur@gmail.com', url: 'mailto:tavares.gargur@gmail.com' },
];

export const email = links.find((l) => l.key === 'email')!.value;

export function period(e: Experience): string {
  return `${e.start} – ${e.end ?? 'present'}`;
}

/** Whole years since the first professional role, for "5+ years" style copy. */
export const yearsOfExperience = (() => {
  const [m, y] = profile.careerStart.split('/').map(Number);
  const now = new Date();
  return Math.floor((now.getFullYear() - y) + (now.getMonth() + 1 - m) / 12);
})();
