export type EventCategory = "meeting" | "reading" | "other";

/**
 * Reading Group is checked before the generic "meeting" match since titles
 * like "MPS Reading Group" would otherwise also satisfy a loose MPS/meeting
 * check. Anything unmatched (including Movie Night) falls into "other".
 */
export function categorizeEvent(title: string): EventCategory {
  const t = title.toLowerCase();
  if (t.includes("reading group")) return "reading";
  if (t.includes("meeting")) return "meeting";
  return "other";
}

export interface CategoryStyle {
  chipClass: string;
}

export const categoryStyles: Record<EventCategory, CategoryStyle> = {
  meeting: {
    chipClass: "bg-panel text-cream hover:bg-neutral-700",
  },
  reading: {
    chipClass: "bg-maroon text-cream hover:bg-[#571414]",
  },
  other: {
    chipClass: "bg-gold text-[#1c1c1c] hover:bg-[#c2af8c]",
  },
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
