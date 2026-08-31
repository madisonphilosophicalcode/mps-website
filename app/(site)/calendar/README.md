# Calendar: Google Calendar conventions

The `/calendar` page renders events pulled live from the MPS Google Calendar
(`madisonphilosophicalsociety@gmail.com`, see `lib/googleCalendar.ts`). The
site derives styling and metadata from event **titles** and
**descriptions**, so how you fill those out in Google Calendar directly
affects how an event looks on the site.

## Color coding (category chips)

The colored chip on the calendar grid is picked by keyword-matching the
event **title**, via an ordered list of rules in `categorizeEvent`
(`lib/eventCategory.ts`, `CATEGORY_RULES`):

| Title contains...                  | Category  | Chip color |
| ----------------------------------- | --------- | ---------- |
| `reading group`                     | `reading` | maroon     |
| `board meeting`                     | `board`   | navy       |
| `meeting` (and not the above)       | `meeting` | cream card |
| anything else (e.g. Movie Night)    | `other`   | gold       |

Rules are checked top to bottom and the first match wins, so more specific
phrases ("reading group", "board meeting") have to come before the generic
"meeting" check — otherwise "MPS Board Meeting" would just match "meeting"
and never reach the board rule. Adding a fifth category later means adding
a rule *above* the generic "meeting" line, not below it. This match is on
the title text, so keep the relevant phrase ("Meeting", "Board Meeting",
"Reading Group") somewhere in the title if you want the corresponding
color.

### Visual weight: meeting is deliberately the loudest thing on the grid

Flagship meetings are, by a wide margin, the most important event category
(social events are a close second; board meetings are rare and minor by
comparison). The chip styling reflects that on purpose, not just via color:

- **Meeting** events render "featured": solid fill, bigger text, bold, not
  italic — `categoryStyles.meeting.chipClass`. The fill is `cream` with dark
  `ink` text and a visible `border-ink/25` — note the border is load-bearing
  here, not decorative: `--color-cream` and `--color-bg` are the *same hex*
  in light mode, so without a border the chip would be invisible, blending
  straight into the page. (An earlier version used `--color-panel`, which is
  also the site's general chrome/background color, so it had the same
  blending problem in reverse; a dedicated bold `forest` green was tried
  after that and also dropped, in favor of this quieter cream-card look.)
  Meeting is still the only category rendered with a solid fill — everything
  else below is an outline with no fill at all — so it's still visually
  distinct by construction, just via fill-vs-outline rather than a loud hue.
- **Everything else** (board, reading, other) renders as a smaller,
  lower-weight **outlined** chip — `categoryStyles[category].secondaryClass`
  — so importance is signaled by fill-vs-outline and size, not just hue.
  This was a deliberate fix: an earlier version gave `board` its own solid
  navy fill, and navy turned out to be the *only* cool color against an
  otherwise warm palette (panel/maroon/gold), so it visually "popped" more
  than meeting despite being the least important category — a classic
  pre-attentive pop-out effect from being the one unique hue in the set.
  Weight/fill doesn't have that failure mode the way color does.
- **Board** additionally gets a small `◆` glyph before its title
  (`categoryGlyph` in `lib/eventCategory.ts`) so it can't be mistaken for a
  regular meeting even by someone ignoring color and weight entirely — an
  earlier idea of giving board the *same* solid panel fill as meeting (just
  a tiny marker to tell them apart) was rejected for the opposite reason:
  it risked looking so similar to a real meeting that someone could
  mistake one for the other.
- On any day with a meeting event, it's always sorted to the front of that
  day's stack in the grid, regardless of time — but only relative to other
  events on the *same day*; a day with only one event is unaffected. This
  only matters on the rare day something else (e.g. a board meeting)
  coincides with a meeting.

## Meeting type dot: a code in the event description

Separately from title-based coloring, an event can carry a small colored dot
+ label (shown next to the title in the detail modal, and as a thin edge
stripe on the grid chip on mobile) by adding a line anywhere in the Google
Calendar event's **description**:

```
Meeting Type: <value>
```

This line is parsed out by `parseMeetingType` (`lib/eventCategory.ts`) and
removed from the description shown on the site — it's a code for the site,
not prose for readers. `<value>` is matched case-insensitively against:

| Value in Gcal contains... | Label shown        | Dot color |
| -------------------------- | ------------------- | --------- |
| `group debate`              | Group Debate        | amber     |
| `debate`                    | Debate               | purple    |
| `group discussion`          | Group Discussion    | olive     |
| `lecture` and `discussion`  | Lecture + Discussion | teal      |
| `lecture`                   | Lecture Style        | blue      |

If the line is missing, malformed, or doesn't match one of the above, no dot
is shown and the description is left untouched.

## Title prefix: keep "MPS" in Gcal, it's stripped on the site

Feel free to keep prefixing event titles with "MPS" in Google Calendar (e.g.
`MPS Reading Group`) — that's still useful there, since it lets someone
scanning their own personal calendar tell an MPS event apart from their
classes and other orgs at a glance.

On the website itself, that prefix is dropped before display
(`cleanEventTitle` in `lib/eventCategory.ts`, used everywhere a title is
shown, including the event detail modal). Every event shown on this page is
already an MPS event by definition, so the prefix adds no information — it
just eats characters in an already-tight, truncating title chip on the
calendar grid. The strip is display-only: the raw title (with "MPS" intact)
is still what gets sent to Google when someone clicks "Add to Calendar"
(`buildGoogleAddEventUrl`), so nothing about the underlying event changes.

The stripper only matches "MPS" as a whole word at the start of the title
(`MPS Meeting`, `MPS: Reading Group`, `MPS - Movie Night`), so it won't
mangle a title like `MPSA Conference`. If a title is *just* "MPS" with
nothing after it, the strip is skipped and the original title is shown
as-is rather than leaving a blank chip.

Flagship meetings in Gcal are titled `MPS Meeting: <topic>` (the word
"Meeting" has to stay in Gcal so `categorizeEvent`, below, still colors the
chip correctly). On the site, "Meeting:" is intentionally **kept** —
`MPS Meeting: Free Will and Moral Responsibility` displays as
`Meeting: Free Will and Moral Responsibility`, everywhere, including the
grid chip. This was tried the other way (stripping "Meeting:" too, on the
theory that the meeting-colored chip already implies it) and walked back:
the grid is a stranger's first look at the page, before they've learned
what the chip colors mean, so "Meeting:" is doing real self-description
work there — cutting it would have made the flagship event type the only
one of the four that doesn't explain itself in text.

## Legend

`components/calendar/CalendarLegend.tsx` renders a small key above the
calendar for the category chip colors, sourced directly from
`categoryLabels` / `categoryStyles` in `lib/eventCategory.ts` so it can't
drift out of sync with the actual chip colors. This is a trial — nothing
about the underlying color data is gated behind it, so it can be removed
without affecting comprehension if it turns out to just be clutter.

The meeting-type dot colors deliberately don't get a legend entry: that
code is always resolved in text one click away, in the event detail modal,
so a legend there would mostly just be explaining something the modal
already explains for free.

## Where this logic lives

- `lib/googleCalendar.ts` — fetches events from the MPS Google Calendar API,
  and builds the "Add to Calendar" link from the raw (unstripped) title.
- `lib/eventCategory.ts` — title-prefix stripping, title-based color
  categorization, and description-based meeting-type parsing.
- `components/calendar/CalendarGrid.tsx` — month grid, renders the colored
  chips.
- `components/calendar/EventModal.tsx` — event detail popup.
- `components/calendar/CalendarLegend.tsx` — the trial legend above the
  grid.
