import { projects } from '../data/portfolio';
import type { ViewMode } from '../composables/useViewMode';
import type { Theme } from '../composables/useTheme';

/** One styled run of text in a terminal line. */
export interface Seg {
  t: string;
  c?: 'k' | 's' | 'n' | 'cm' | 'dim' | 'b' | 'warn';
  href?: string;
}

/** Rich blocks reuse the same components the TTY view renders statically. */
export type BlockKind = 'whoami' | 'neofetch' | 'ls' | 'gitlog' | 'skills' | 'contact' | 'repos' | 'cat';

export type Output = { kind: 'lines'; lines: Seg[][] } | { kind: BlockKind };

export interface ShellContext {
  setMode: (m: ViewMode) => void;
  setTheme: (t: Theme) => void;
  theme: () => Theme;
  clear: () => void;
  exit?: () => void;
}

const lines = (...ls: Seg[][]): Output => ({ kind: 'lines', lines: ls });
const block = (kind: BlockKind): Output => ({ kind });

const HELP: [string, string][] = [
  ['whoami', 'who is this'],
  ['neofetch', 'system info, sort of'],
  ['ls', 'list games'],
  ['open <name|n>', 'link to a game'],
  ['git log', 'work history'],
  ['skills', 'cat skills.json'],
  ['gh repo list', 'recent GitHub repos'],
  ['contact', 'how to reach me'],
  ['gui / tty', 'switch view'],
  ['theme [light|dark]', 'switch colors'],
  ['clear', 'clear this log'],
];

type Handler = (args: string[], ctx: ShellContext) => Output[] | null;

const COMMANDS: Record<string, Handler> = {
  help: () => [
    lines(
      [{ t: 'available commands:' }],
      ...HELP.map(([cmd, what]) => [{ t: cmd.padEnd(20, ' '), c: 'k' as const }, { t: what, c: 'dim' as const }]),
      [{ t: 'there are a few more. try sudo.', c: 'dim' }],
    ),
  ],
  whoami: () => [block('whoami')],
  neofetch: () => [block('neofetch')],
  ls: () => [block('ls')],
  open: (args) => {
    const q = (args[0] ?? '').toLowerCase();
    const p = projects[Number(q) - 1] ?? (q ? projects.find((x) => x.slug.startsWith(q)) : undefined);
    if (!p) {
      return [lines([{ t: `usage: open <name|1-${projects.length}>   e.g. open kitty`, c: 'dim' }])];
    }
    return [lines([{ t: '→ ' }, { t: `${p.title} on ${p.host}`, href: p.url }, { t: '  (click to open)', c: 'dim' }])];
  },
  git: (args) =>
    args[0] === 'log'
      ? [block('gitlog')]
      : [lines([{ t: 'only ' }, { t: 'git log', c: 'k' }, { t: ' is installed here' }])],
  gh: (args) =>
    args[0] === 'repo' && args[1] === 'list'
      ? [block('repos')]
      : [lines([{ t: 'usage: ' }, { t: 'gh repo list', c: 'k' }])],
  skills: () => [block('skills')],
  contact: () => [block('contact')],
  cat: (args) => {
    const f = args[0] ?? '';
    if (f.startsWith('skills')) return [block('skills')];
    if (f.startsWith('contact')) return [block('contact')];
    return [
      lines([
        { t: `cat: ${f || '?'}: No such file. Try ` },
        { t: 'cat skills.json', c: 'k' },
        { t: ' or ' },
        { t: 'cat contact.txt', c: 'k' },
      ]),
    ];
  },
  gui: (_a, ctx) => {
    ctx.setMode('gui');
    return [lines([{ t: 'switched to GUI', c: 'dim' }])];
  },
  tty: (_a, ctx) => {
    ctx.setMode('tty');
    return [lines([{ t: 'switched to TTY', c: 'dim' }])];
  },
  theme: (args, ctx) => {
    const wanted = args[0];
    const next: Theme = wanted === 'light' || wanted === 'dark' ? wanted : ctx.theme() === 'dark' ? 'light' : 'dark';
    ctx.setTheme(next);
    return [lines([{ t: `theme: ${next}`, c: 'dim' }])];
  },
  date: () => [lines([{ t: new Date().toString() }])],
  echo: (args) => [lines([{ t: args.join(' ') }])],
  sudo: (args) =>
    args.join(' ') === 'hire-me'
      ? [lines([{ t: '[sudo] password for guest: ********', c: 's' }], [{ t: 'access granted. opening contact.txt' }]), block('contact')]
      : [
          lines([
            { t: 'guest is not in the sudoers file. This incident will be reported. ' },
            { t: '(try sudo hire-me)', c: 'dim' },
          ]),
        ],
  rm: (args) =>
    args.some((a) => a.includes('r') && a.startsWith('-'))
      ? [lines([{ t: "rm: refusing to remove '/': protected by a cat", c: 'warn' }]), block('cat')]
      : [lines([{ t: 'rm: missing operand', c: 'dim' }])],
  exit: (_a, ctx) => {
    if (ctx.exit) {
      ctx.exit();
      return null;
    }
    return [lines([{ t: 'nice try. you can switch to the GUI with ' }, { t: 'gui', c: 'k' }])];
  },
};

/** Runs one input line. Returns `null` when nothing should be printed. */
export function run(input: string, ctx: ShellContext): Output[] | null {
  const [cmd = '', ...args] = input.trim().split(/\s+/);
  if (!cmd) return null;
  if (cmd === 'clear') {
    ctx.clear();
    return null;
  }
  const handler = COMMANDS[cmd.toLowerCase()];
  if (!handler) {
    return [lines([{ t: `zsh: command not found: ${cmd}  ` }, { t: '· type help', c: 'dim' }])];
  }
  return handler(args, ctx);
}
