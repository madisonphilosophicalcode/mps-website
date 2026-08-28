import type { SanityBoard, SanityBoardMember } from "@/lib/sanity/queries";

export interface BoardGroup {
  label: string;
  year: number;
  semester: string;
  members: SanityBoardMember[];
}

const SEMESTER_RANK: Record<string, number> = { Spring: 0, Fall: 1 };

function memberSignature(members: SanityBoardMember[]): string {
  return members
    .map((member) => `${member.name}|${member.role}`)
    .sort()
    .join(";");
}

interface MutableGroup extends BoardGroup {
  endYear: number;
  endSemester: string;
}

/**
 * Maps each member name to their most recent photo across all boards, so a
 * semester where someone is missing a photo can borrow theirs from whichever
 * other semester most recently had one.
 */
function latestPhotosByName(
  boards: SanityBoard[],
): Map<string, SanityBoardMember["image"]> {
  const newestFirst = [...boards].sort((a, b) =>
    a.year !== b.year
      ? b.year - a.year
      : SEMESTER_RANK[b.semester] - SEMESTER_RANK[a.semester],
  );

  const photos = new Map<string, SanityBoardMember["image"]>();
  for (const board of newestFirst) {
    for (const member of board.members ?? []) {
      if (member.image && !photos.has(member.name)) {
        photos.set(member.name, member.image);
      }
    }
  }
  return photos;
}

/**
 * Groups boards chronologically, collapsing consecutive semesters whose
 * member roster (name + role, ignoring photo and array order) is identical
 * into a single range entry ("Fall 2024 – Spring 2025") instead of two
 * duplicate cards. Returns newest group first.
 */
export function groupBoardHistory(boards: SanityBoard[]): BoardGroup[] {
  const photosByName = latestPhotosByName(boards);

  const sorted = [...boards].sort((a, b) =>
    a.year !== b.year
      ? a.year - b.year
      : SEMESTER_RANK[a.semester] - SEMESTER_RANK[b.semester],
  );

  const groups: MutableGroup[] = [];

  for (const board of sorted) {
    const members = (board.members ?? []).map((member) => ({
      ...member,
      image: member.image ?? photosByName.get(member.name),
    }));
    const signature = memberSignature(members);
    const last = groups[groups.length - 1];

    if (last && memberSignature(last.members) === signature) {
      last.endYear = board.year;
      last.endSemester = board.semester;
      last.label = `${last.semester} ${last.year} – ${board.semester} ${board.year}`;
      continue;
    }

    groups.push({
      label: `${board.semester} ${board.year}`,
      year: board.year,
      semester: board.semester,
      endYear: board.year,
      endSemester: board.semester,
      members,
    });
  }

  return groups.reverse().map(({ label, year, semester, members }) => ({
    label,
    year,
    semester,
    members,
  }));
}
