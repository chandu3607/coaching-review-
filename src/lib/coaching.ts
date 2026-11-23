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

export interface SiteConfig {
  name: string; tagline: string; owner: string; contactEmail: string; checked: string; url: string;
  metaDescription: string; disclosureBadge: string; disclosureShort: string; disclosureLong: string;
  disclosureLink: string; footerAbout: string; footerErrorPrefix: string; footerLegal: string;
}
export interface Nav {
  header: { href: string; label: string }[]; headerCta: { href: string; label: string };
  sections: [string, string][]; footer: { href: string; label: string }[];
  palette: { id: string; label: string; hint: string; href: string }[];
}
type Block = Record<string, string>;
export interface Home {
  hero: Block; bento: Block; scorecard: Block; institutes: Block; glance: Block; claims: Block;
  questions: Block; voices: Block; fit: Block; finale: Block;
}
export interface Pages {
  methodology: Block; insights: Block & { rhythm: [InstId, number[], string][] }; compare: Block & { defaultIds: InstId[] };
  submitReview: Block & { promises: string[]; usefulTips: string[]; notPublished: string[] };
}
export interface ReviewFormData { aspects: [string, string][]; years: string[]; modes: string[]; recommend: string[] }

const data = raw as unknown as {
  PARAMS: Param[]; GLANCE: string[]; CHANNELS: string[];
  BACKING: Record<Backing, [string, string]>; CLOSE: Record<string, string>;
  INST: Institute[]; PIC: Record<InstId, [string, string]>;
  SHOTS: Partial<Record<InstId, ShotSet>>; USP: Record<InstId, [number, string, string, string?][]>;
  RESULTS_SHOTS: Partial<Record<InstId, { lede: string; items: [string, string][] }>>;
  REDDIT: Partial<Record<InstId, RedditData>>; GLANCE_NOTE: Record<string, string>;
  RUB: Record<ParamKey, RubricCriterion[]>; WHY: Record<ParamKey, Record<InstId, string>>;
  TAKE: Record<ParamKey, string>; REAL99: number;
  SITE: SiteConfig; NAV: Nav; HOME: Home; PAGES: Pages; REVIEW_FORM: ReviewFormData;
  BANDS: [number, string][]; PRIO_W: number; HERO_PRIO: [ParamKey, string][];
  CLAIMS_CHART: { barMax: number; trendIds: InstId[]; trendYears: string[]; trendMax: number };
  QUESTIONS: { m: string; t: string; s: string; panel: string }[];
  MENTOR_KIND: Record<InstId, string>; LOGO_AR: Record<InstId, number>;
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
export const site = data.SITE;
export const NAV = data.NAV;
export const HOME = data.HOME;
export const PAGES = data.PAGES;
export const REVIEW_FORM = data.REVIEW_FORM;
export const BANDS = data.BANDS;
export const PRIO_W = data.PRIO_W;
export const HERO_PRIO = data.HERO_PRIO;
export const CLAIMS_CHART = data.CLAIMS_CHART;
export const QUESTIONS = data.QUESTIONS;
export const MENTOR_KIND = data.MENTOR_KIND;
export const LOGO_AR = data.LOGO_AR;

export const BY = Object.fromEntries(INST.map((i) => [i.id, i])) as Record<InstId, Institute>;
export const RANKED = [...INST].sort((a, b) => b.oRaw - a.oRaw);
export const AVG = PARAMS.map((_, i) => INST.reduce((a, I) => a + I.sc[i], 0) / INST.length);
export const PIDX = Object.fromEntries(PARAMS.map((p, i) => [p.k, i])) as Record<ParamKey, number>;
export const TOTAL_CLAIM = INST.reduce((a, I) => a + (I.claim || 0), 0);
export const CLAIMERS = INST.filter((I) => I.claim).length;
export const X247 = INST.filter((I) => I.doubt.x247).length;
/** Total number of rubric checks across all areas. */
export const N_CHECKS = PARAMS.reduce((t, p) => t + RUB[p.k].length, 0);

/** Fills {placeholders} in text from coaching.json, so numbers and dates are only ever typed once. */
export function tpl(text: string) {
  const vals: Record<string, string | number> = {
    checked: site.checked, owner: site.owner, email: site.contactEmail, n: INST.length,
    areas: PARAMS.length, checks: N_CHECKS, real99: REAL99.toLocaleString("en-IN"),
    claimers: CLAIMERS, totalClaim: TOTAL_CLAIM.toLocaleString("en-IN"),
  };
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in vals ? String(vals[k]) : m));
}

/** Fit-finder weighting: each chosen priority counts PRIO_W times as much (PRIO_W is set in coaching.json). */
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
