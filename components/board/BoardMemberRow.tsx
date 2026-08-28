import Image from "next/image";
import type { SanityBoardMember } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberCard({ member }: { member: SanityBoardMember }) {
  return (
    <div className="flex w-[76px] shrink-0 snap-start flex-col items-center gap-1.5 text-center sm:w-[92px] sm:shrink">
      <div className="relative size-[64px] overflow-hidden rounded-full bg-panel sm:size-[80px]">
        {member.image ? (
          <Image
            src={urlFor(member.image).width(160).height(160).url()}
            alt={member.name}
            fill
            sizes="(min-width: 640px) 80px, 64px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-serif text-base text-cream italic sm:text-xl">
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-serif text-13 text-ink italic sm:text-15">
          {member.name}
        </p>
        <p className="font-mono text-9 tracking-wide text-gold uppercase sm:text-11">
          {member.role}
        </p>
      </div>
    </div>
  );
}

// Below `sm`, the row scrolls and snaps (touch swipe carries it — no
// carousel widget). At `sm` and up there's room for everyone, so it becomes
// one line spanning the full width with the leftover space distributed
// between cards.
export default function BoardMemberRow({
  members,
}: {
  members: SanityBoardMember[];
}) {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:snap-none sm:justify-between sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
      {members.map((member) => (
        <MemberCard key={`${member.name}-${member.role}`} member={member} />
      ))}
    </div>
  );
}
