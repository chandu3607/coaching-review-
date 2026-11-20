import raw from "@/data/coaching.json";

export type InstId = "cl" | "cr" | "eg" | "im" | "iq" | "pw" | "ro" | "ti";
export type Backing = "audited" | "named" | "partial" | "none";
export type ParamKey = "res" | "fac" | "rec" | "pra" | "dou" | "moc" | "app" | "con" | "com" | "men";

export interface Param { k: ParamKey; n: string; s: string }
export interface Institute {
  id: InstId; name: string; short: string; code: string; dot: string;
  stand: string; watch: string;
  claim: number | null; claimTxt: string; backing: Backing; years?: (number | null)[];
  pct: number[]; facTop: string;
  hours: { v: number | null; hi?: number; txt: string };
  rec: { kind: string; v: number | null; txt: string };
  practice: { v: number | null; lo?: number; txt: string; scope?: string };
  doubt: { x247: boolean; resp: string; ch: string; who: string };
  mocks: { full: number | null; sect: number | null; pkg: string; close: keyof typeof CLOSE };
  app: string; content: string; pyq: string;
  chan: number[]; mentor: { n: number | null; txt: string };
  voice: { p: string; m: string };
  glance: number[]; sc: number[]; oRaw: number; o: number;
}
export interface RubricCriterion { l: string; max: number; lv: [number, string][]; v: Record<InstId, number> }
export interface RedditData {
  n: number; when: string; src: string;
  minus: [string, number, string][]; plus: [string, number, string][];
  shots?: [string, string][];
}
export interface ShotSet {
  src: string; kind: "phone" | "web"; showcase?: boolean; items: [string, string][];
  extra?: { title: string; kind: "phone" | "web"; prefix: string; items: [string, string][] };
}

const data = raw as unknown as {
  PARAMS: Param[]; GLANCE: string[]; CHANNELS: string[];
  BACKING: Record<Backing, [string, string]>; CLOSE: Record<string, string>;
  INST: Institute[]; PIC: Record<InstId, [string, string]>;
  SHOTS: Partial<Record<InstId, ShotSet>>; USP: Record<InstId, [number, string, string, string?][]>;
  RESULTS_SHOTS: Partial<Record<InstId, { lede: string; items: [string, string][] }>>;
  REDDIT: Partial<Record<InstId, RedditData>>; GLANCE_NOTE: Record<string, string>;
  RUB: Record<ParamKey, RubricCriterion[]>; WHY: Record<ParamKey, Record<InstId, string>>;
  TAKE: Record<ParamKey, string>; REAL99: number;
};

export const CLOSE = data.CLOSE as Record<"closest" | "close" | "little" | "harder" | "basic", string>;
export const PARAMS = data.PARAMS;
export const GLANCE = data.GLANCE;
export const CHANNELS = data.CHANNELS;
export const BACKING = data.BACKING;
export const INST = data.INST;
export const PIC = data.PIC;
export const SHOTS = data.SHOTS;
export const USP = data.USP;
export const RESULTS_SHOTS = data.RESULTS_SHOTS;
export const REDDIT = data.REDDIT;
export const GLANCE_NOTE = data.GLANCE_NOTE;
export const RUB = data.RUB;
export const WHY = data.WHY;
export const TAKE = data.TAKE;
export const REAL99 = data.REAL99;

export const BY = Object.fromEntries(INST.map((i) => [i.id, i])) as Record<InstId, Institute>;
export const RANKED = [...INST].sort((a, b) => b.oRaw - a.oRaw);
export const AVG = PARAMS.map((_, i) => INST.reduce((a, I) => a + I.sc[i], 0) / INST.length);
export const PIDX = Object.fromEntries(PARAMS.map((p, i) => [p.k, i])) as Record<ParamKey, number>;
export const TOTAL_CLAIM = INST.reduce((a, I) => a + (I.claim || 0), 0);
export const CLAIMERS = INST.filter((I) => I.claim).length;
export const X247 = INST.filter((I) => I.doubt.x247).length;

/** Fit-finder weighting: each chosen priority counts PRIO_W times as much. */
export const PRIO_W = 4;
export function fitScore(I: Institute, prio: ParamKey[]) {
  let tw = 0, t = 0;
  PARAMS.forEach((p, i) => {
    const w = prio.includes(p.k) ? PRIO_W : 1;
    tw += w; t += w * I.sc[i];
  });
  return t / tw;
}
export function strengths(I: Institute) {
  return I.sc
    .map((v, i) => [v, PARAMS[i].s] as const)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 2)
    .map(([v, s]) => `${s} ${f1(v)}`)
    .join(" · ");
}

export const f1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1);
export const fmt = (n: number) => Number(n).toLocaleString("en-IN");
export const ord = (n: number) => n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th");
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function rating(v: number): { label: string; cls: string } {
  if (v >= 8) return { label: "Strong", cls: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25" };
  if (v >= 6.5) return { label: "Good", cls: "bg-sky-500/15 text-sky-300 ring-sky-400/25" };
  if (v >= 5) return { label: "Fair", cls: "bg-amber-500/15 text-amber-300 ring-amber-400/25" };
  return { label: "Limited", cls: "bg-rose-500/15 text-rose-300 ring-rose-400/25" };
}
/** score → tailwind-free inline colour (soft indigo heat-map) */
export function heat(v: number) {
  const t = Math.min(1, Math.max(0, v / 10));
  const a = [24, 29, 43], b = [20, 150, 235];
  const c = a.map((x, i) => Math.round(x + (b[i] - x) * Math.pow(t, 1.05)));
  return { bg: `rgb(${c.join(",")})`, fg: t >= 0.45 ? "#fff" : "#a4adc2" };
}

/** Logo pixel sizing: s is the side of an equivalent square. */
export const LOGO_AR: Record<InstId, number> = { cl: 3.809, iq: 3.488, eg: 1.082, ro: 1.925, ti: 1.0, im: 1.5, pw: 0.818, cr: 1.44 };

export const HERO_PRIO: [ParamKey, string][] = [
  ["res", "Proven results"], ["moc", "Mocks like CAT"], ["dou", "Fast doubt help"], ["men", "1:1 mentoring"],
];

export const QUESTIONS = [
  { m: "Question 1", t: "Has anyone checked the 99+ count?", s: "Only IMS and Cracku had their CAT 2025 counts checked by a CA firm. T.I.M.E. had its 2024 offers checked, but not its percentiles." },
  { m: "Question 2", t: "Who actually teaches you?", s: "Six of the eight publish their lead teachers’ percentiles, and most are 99.9 or above. Career Launcher and T.I.M.E. publish none." },
  { m: "Question 3", t: "How fast are doubts answered?", s: "Five offer 24×7 help. Only iQuanta says how fast it replies, and Cracku says about one working day. These are the institutes’ own claims." },
  { m: "Question 4", t: "Do the mocks feel like CAT?", s: "Students see IMS’s SimCATs as the closest. Cracku, T.I.M.E. and Rodha’s VARC section are harder than the real paper." },
  { m: "Question 5", t: "Who mentors you, and how often?", s: "IMS offers up to 7 one-on-one sessions, PW offers 5 and Career Launcher offers 4. The rest offer calls, group sessions or mentoring for selected batches." },
];
export const MENTOR_KIND: Record<InstId, string> = {
  im: "One-on-one, assigned mentor", pw: "One-on-one, Rapid-Fire batch", cl: "One-on-one, CAT 2027 online",
  cr: "Phone and bookable calls", eg: "Personal mentor, no session count", iq: "Selected students only",
  ro: "Group sessions with faculty", ti: "In person or by email",
};
