import { site } from "@/data/site";

export interface QuickInfoItem {
  label: string;
  value: string;
  href?: string;
}

export const quickInfo: QuickInfoItem[] = [
  {
    label: "Contact",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Meeting Location",
    value: "5193 Helen C. White",
  },
  {
    label: "Club Mailbox",
    value: "Floor 5 Helen C. White",
  },
  {
    label: "Join the Email List",
    value: "Get meeting reminders and updates",
    href: site.mailingListUrl,
  },
  {
    label: "Want to Present?",
    value: "Presenter Interest Form",
    href: `https://docs.google.com/forms/d/e/1FAIpQLScaDdQJb6IVPpL9EnpUSdTKa5DhkIsGezx-NB2jH1sm9SwqLQ/viewform?usp=dialog`,
  },
];

export interface StatItem {
  label: string;
  value: string;
  detail: string;
  sourceLabel?: string;
  sourceHref?: string;
}

export const philosophyStats: StatItem[] = [
  {
    label: "Grad School Tests",
    value: "#1 on GRE",
    detail:
      "Philosophy majors rank first among all majors on the GRE's verbal and writing sections, and post a 159 average LSAT score. On the GMAT, they place in the top five.",
    sourceLabel: "Daily Nous — Value of Philosophy: Charts and Graphs",
    sourceHref: "https://dailynous.com/value-of-philosophy/charts-and-graphs/",
  },
  {
    label: "Grad School Bound",
    value: "56.9%",
    detail:
      "Over half of philosophy majors go on to earn a graduate degree: well above the 39.3% average across all majors. Among the highest share of any field.",
    sourceLabel: "Federal Reserve Bank of New York",
    sourceHref:
      "https://www.newyorkfed.org/research/college-labor-market#--:explore:outcomes-by-major",
  },
  {
    label: "Philosophy is Fun",
    value: "Love of the Game",
    detail:
      "You'll see the world differently, evaluate and critically assess claims, and learn more about the world. There is a subdiscipline for everyone, from free will to language, and metaphysics to epistemology; Philosophy is exciting!",
  },
];

export interface DeclareInfoItem {
  label: string;
  value: string;
  href?: string;
}

export const declareSource = {
  label: "philosophy.wisc.edu — Major Declaration",
  href: "https://philosophy.wisc.edu/undergraduate-program-2/major-declaration/",
};

export const declareInfo: DeclareInfoItem[] = [
  {
    label: "Undergraduate Advisor",
    value: "Dr. Martha Gibson",
    href: "https://philosophy.wisc.edu/staff/gibson-martha/",
  },
  {
    label: "Location",
    value: "5117 Helen C. White Hall",
  },
  {
    label: "Email",
    value: "migibson@wisc.edu",
    href: "mailto:migibson@wisc.edu",
  },
  {
    label: "Schedule via Starfish",
    value: "oacs.wisc.edu/starfish",
    href: "https://oacs.wisc.edu/starfish/starfish-student-resources/",
  },
];

export const declareNote =
  "Appointments can be made by email or during office hours.";

export const requirementsSource = {
  label: "guide.wisc.edu — Philosophy, BS Requirements",
  href: "https://guide.wisc.edu/undergraduate/letters-science/philosophy/philosophy-bs/#requirementstext",
};

export const majorRequirements = [
  "8 PHILOS courses, minimum 27 credits",
  "PHILOS 211 (Elementary Logic) or PHILOS 511 (Symbolic Logic)",
  "PHILOS 430 (History of Ancient Philosophy) and PHILOS 432 (History of Modern Philosophy)",
  "5 advanced PHILOS courses (15 credits): 430, 432, and 511 may count toward this",
  "1 course in Metaphysics and Epistemology",
  "1 course in Value Theory",
];

export interface GradSchoolSection {
  title: string;
  body: string;
  sourceLabel: string;
  sourceHref: string;
}

const splinterSource = {
  sourceLabel: "The Splintered Mind — Applying to PhD Programs in Philosophy",
  sourceHref:
    "http://schwitzsplinters.blogspot.com/2019/06/applying-to-phd-programs-in-philosophy.html",
};

const pdxSource = {
  sourceLabel: "PDX Philosophy — Application Guide to Graduate School",
  sourceHref:
    "https://www.pdx.edu/philosophy/sites/philosophy.web.wdt.pdx.edu/files/2020-10/Application%20Guide_0.pdf",
};

export const gradSchoolSections: GradSchoolSection[] = [
  {
    title: "Should You Apply?",
    body: "The field is extremely competitive, and most programs have completion rates around 50%. Before applying, be honest about two things: would you take a teaching job anywhere in the country, at any institution? And are you motivated enough to finish a largely unstructured, multi-year dissertation without a career guarantee at the end?",
    ...splinterSource,
  },
  {
    title: "Timeline",
    body: "Most completed applications are due in early January, though some deadlines fall as early as November or as late as February. Start drafting materials and requesting letters of recommendation well before then — recommenders need real notice, not a rush job.",
    ...pdxSource,
  },
  {
    title: "Writing Sample",
    body: "Take a paper you've already written for a class — one that got a strong grade and real engagement from the professor — and revise it further, rather than starting something new from scratch.",
    ...pdxSource,
  },
  {
    title: "Personal Statement",
    body: "Be specific about your philosophical interests rather than vague. Admissions committees want to see your interests fit their faculty, so avoid naming areas the program doesn't cover.",
    ...pdxSource,
  },
  {
    title: "Letters of Recommendation",
    body: "Ask professors who know your work well, and request letters well ahead of your earliest deadline. Give them your writing sample, statement draft, and a short summary of your interests to make their job easier.",
    ...pdxSource,
  },
  {
    title: "Choosing Programs",
    body: "Use the Philosophical Gourmet Report as a baseline, then build a portfolio: several schools at your realistic tier, a couple of reaches, and a couple of safeties. Prioritize fit over prestige — faculty research areas and placement records reveal more than rank alone.",
    ...splinterSource,
  },
];
