import type { SanityBoard } from "@/lib/sanity/queries";
import { groupBoardHistory } from "@/lib/boardHistory";
import BoardMemberRow from "@/components/board/BoardMemberRow";

export default function BoardSection({ boards }: { boards: SanityBoard[] }) {
  const groups = groupBoardHistory(boards);
  if (groups.length === 0) return null;

  const [current, ...past] = groups;

  return (
    <div className="flex w-full max-w-[900px] flex-col gap-10">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="font-serif text-26 text-ink italic sm:text-4xl">
          The Board
        </h2>
        <p className="font-mono text-sm text-ink/70 italic">
          {current.label}
        </p>
      </div>

      <BoardMemberRow members={current.members} />

      {past.length > 0 && (
        <div className="flex flex-col gap-10">
          <h2 className="text-center font-serif text-26 text-ink italic sm:text-4xl">
            Past Boards
          </h2>
          {past.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <p className="text-center font-mono text-sm text-ink/70 italic">
                {group.label}
              </p>
              <BoardMemberRow members={group.members} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
