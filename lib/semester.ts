export interface Term {
  label: string;
  start: Date;
  end: Date;
}

/**
 * Resolves the "current" academic term from today's date.
 * Fall: Sep-Dec. Spring: Jan-May. Summer (Jun-Aug) rolls forward to the
 * upcoming Fall so the calendar never shows a dead summer state.
 */
export function getCurrentTerm(now: Date = new Date()): Term {
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();

  if (month >= 8) {
    return {
      label: `Fall ${year}`,
      start: new Date(Date.UTC(year, 8, 1)),
      end: new Date(Date.UTC(year, 11, 31, 23, 59, 59)),
    };
  }

  if (month <= 4) {
    return {
      label: `Spring ${year}`,
      start: new Date(Date.UTC(year, 0, 1)),
      end: new Date(Date.UTC(year, 4, 31, 23, 59, 59)),
    };
  }

  return {
    label: `Fall ${year}`,
    start: new Date(Date.UTC(year, 8, 1)),
    end: new Date(Date.UTC(year, 11, 31, 23, 59, 59)),
  };
}
