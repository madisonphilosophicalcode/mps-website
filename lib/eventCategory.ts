export type EventCategory = "meeting" | "board" | "reading" | "other";

/**
 * Strips a leading "MPS" prefix for display. The prefix disambiguates MPS
 * events on a personal Google Calendar, but every event on this site's
 * calendar is already an MPS event, so it's dropped here to save space in
 * the title. Only matches "MPS" as a whole word (not "MPSA" etc.), and
 * falls back if stripping would leave the title empty. Used everywhere
 * titles are shown, including the event detail modal. "Meeting:" is
 * deliberately left in place (e.g. "MPS Meeting: Free Will" -> "Meeting:
 * Free Will"): the grid is a stranger's first look at the page, before
 * they've learned what the chip colors mean, so the word is doing real
 * self-description work there, not just taking up space.
 */
export function cleanEventTitle(title: string): string {
  const stripped = title.replace(/^mps\b[\s\-:–—]*/i, "").trim();
  return stripped.length > 0 ? stripped : title;
}

interface CategoryRule {
  category: Exclude<EventCategory, "other">;
  test: (title: string) => boolean;
}

/**
 * Checked in order, most specific first. "Board Meeting" and "MPS Reading
 * Group" both contain "meeting"-adjacent substrings that the generic
 * "meeting" rule would otherwise swallow, so it has to run last. Add new
 * categories above the "meeting" rule, not below it.
 */
const CATEGORY_RULES: CategoryRule[] = [
  { category: "reading", test: (t) => t.includes("reading group") },
  { category: "board", test: (t) => t.includes("board meeting") },
  { category: "meeting", test: (t) => t.includes("meeting") },
];

export function categorizeEvent(title: string): EventCategory {
  const t = title.toLowerCase();
  return CATEGORY_RULES.find((rule) => rule.test(t))?.category ?? "other";
}

export interface CategoryStyle {
  /** Solid, filled treatment. Only "meeting" actually renders with this. */
  chipClass: string;
  /**
   * Outlined, lower-visual-weight treatment for everything that isn't the
   * flagship meeting, so importance is signaled by weight/fill (robust,
   * doesn't rely on hue discrimination) rather than by tuning each color to
   * "not pop too much."
   */
  secondaryClass: string;
  /** Small swatch shown in the legend; mirrors chipClass vs secondaryClass. */
  swatchClass: string;
}

export const categoryStyles: Record<EventCategory, CategoryStyle> = {
  meeting: {
    chipClass: "bg-ink text-bg hover:opacity-90",
    secondaryClass: "border border-ink/40 text-ink/70 hover:border-ink",
    swatchClass: "bg-ink",
  },
  board: {
    chipClass: "bg-navy text-cream hover:bg-[#3f5c78]",
    secondaryClass: "border border-navy/50 text-ink/70 hover:border-navy",
    swatchClass: "border border-navy/70",
  },
  reading: {
    chipClass: "bg-maroon text-cream hover:bg-[#571414]",
    secondaryClass: "border border-maroon/50 text-ink/70 hover:border-maroon",
    swatchClass: "border border-maroon/70",
  },
  other: {
    chipClass: "bg-gold text-[#1c1c1c] hover:bg-[#c2af8c]",
    secondaryClass: "border border-gold/60 text-ink/70 hover:border-gold",
    swatchClass: "border border-gold/70",
  },
};

export const categoryLabels: Record<EventCategory, string> = {
  meeting: "Meeting",
  board: "Board Meeting",
  reading: "Reading Group",
  other: "Other",
};

export type MeetingType =
  | "lecture"
  | "lecture-discussion"
  | "group-discussion"
  | "group-debate"
  | "debate";

export const meetingTypeLabels: Record<MeetingType, string> = {
  lecture: "Lecture Style",
  "lecture-discussion": "Lecture + Discussion",
  "group-discussion": "Group Discussion",
  "group-debate": "Group Debate",
  debate: "Debate",
};

export const meetingTypeDotColor: Record<MeetingType, string> = {
  lecture: "#6b8fb0",
  "lecture-discussion": "#6ba58f",
  "group-discussion": "#9db06b",
  "group-debate": "#c98a4b",
  debate: "#8a6bb0",
};

function matchMeetingType(rawLabel: string): MeetingType | null {
  const normalized = rawLabel.toLowerCase();
  if (normalized.includes("group debate")) return "group-debate";
  if (normalized.includes("debate")) return "debate";
  if (normalized.includes("group discussion")) return "group-discussion";
  if (normalized.includes("lecture") && normalized.includes("discussion"))
    return "lecture-discussion";
  if (normalized.includes("lecture")) return "lecture";
  return null;
}

export interface ParsedDescription {
  meetingType: MeetingType | null;
  meetingTypeLabel: string | null;
  cleanedDescription: string;
}

/**
 * Looks for a "Meeting Type: X" line anywhere in the event description,
 * strips it from the prose, and maps it to a known style if recognized.
 */
export function parseMeetingType(
  description: string | undefined,
): ParsedDescription {
  if (!description) {
    return {
      meetingType: null,
      meetingTypeLabel: null,
      cleanedDescription: "",
    };
  }

  const lines = description.split("\n");
  const typeLineIndex = lines.findIndex((line) =>
    /^\s*meeting type\s*:/i.test(line),
  );

  if (typeLineIndex === -1) {
    return {
      meetingType: null,
      meetingTypeLabel: null,
      cleanedDescription: description,
    };
  }

  const rawLabel = lines[typeLineIndex]
    .replace(/^\s*meeting type\s*:/i, "")
    .trim();
  const cleanedDescription = lines
    .filter((_, i) => i !== typeLineIndex)
    .join("\n")
    .trim();

  return {
    meetingType: matchMeetingType(rawLabel),
    meetingTypeLabel: rawLabel || null,
    cleanedDescription,
  };
}
