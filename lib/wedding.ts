// Values worked out from data/wedding.ts (dates, times, calendar, links), per language.
import { wedding } from "@/data/wedding";

export type Lang = "en" | "ar";
const locale = (l: Lang) => (l === "ar" ? "ar-EG" : "en-US");

const [Y, M, D] = wedding.date.split("-").map(Number);
const day = new Date(Y, M - 1, D);

export function dateParts(l: Lang) {
  const f = (o: Intl.DateTimeFormatOptions) => day.toLocaleDateString(locale(l), o);
  const up = (s: string) => (l === "en" ? s.toUpperCase() : s);
  return {
    weekday: up(f({ weekday: "long" })), // MONDAY / الاثنين
    day: num(D, l), // 7 / ٧
    month: up(f({ month: "long" })), // DECEMBER / ديسمبر
    monthTitle: f({ month: "long", year: "numeric" }), // December 2026
    year: num(Y, l).replace(/[٬,]/g, ""),
    long: f({ month: "long", day: "numeric", year: "numeric" }), // December 7, 2026 / ٧ ديسمبر ٢٠٢٦
    /** Mo..Su (Monday first) */
    weekdays: Array.from({ length: 7 }, (_, i) =>
      new Date(2024, 0, 1 + i).toLocaleDateString(locale(l), { weekday: l === "ar" ? "narrow" : "short" }).slice(0, l === "ar" ? 3 : 2)
    ),
  };
}

export const num = (n: number, l: Lang) => n.toLocaleString(locale(l), { useGrouping: false });

/** "18:00" -> "6:00 PM" / "٦:٠٠ م" */
export function formatTime(hhmm: string, l: Lang) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(locale(l), { hour: "numeric", minute: "2-digit" });
}

/** Countdown target: party date at ceremony time, in the venue's time zone. */
export const countdownTarget = `${wedding.date}T${wedding.ceremony.time}:00${wedding.utcOffset}`;
/** RSVP closes at the end of the deadline day (venue time). */
export const rsvpCloses = `${wedding.rsvp.deadline}T23:59:59${wedding.utcOffset}`;
export function rsvpDeadline(l: Lang) {
  const [y, m, d] = wedding.rsvp.deadline.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale(l), { month: "long", day: "numeric", year: "numeric" });
}

/** Calendar cells for the party month, Monday first (null = empty cell). */
export function calendarCells(): (number | null)[] {
  const first = (new Date(Y, M - 1, 1).getDay() + 6) % 7; // 0 = Monday
  const days = new Date(Y, M, 0).getDate();
  return [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
}
export const weddingDay = D;

const venue = wedding.reception ?? wedding.ceremony;
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=16&output=embed`;
export const directionsUrl = venue.mapsLink;

const stamp = (date: string, time: string) => date.replaceAll("-", "") + "T" + time.replace(":", "") + "00";
function endDate() {
  const end = wedding.ceremony.endTime;
  if (end >= wedding.ceremony.time) return wedding.date;
  const n = new Date(Y, M - 1, D + 1); // ends after midnight
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}
const couple = `${wedding.couple[0].en} & ${wedding.couple[1].en}`;
export const calendarUrl =
  "https://www.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(`${couple}'s Engagement`)}` +
  `&dates=${stamp(wedding.date, wedding.ceremony.time)}/${stamp(endDate(), wedding.ceremony.endTime)}` +
  `&ctz=${encodeURIComponent(wedding.timeZone)}` +
  `&details=${encodeURIComponent(`Join us to celebrate the engagement of ${couple}\n${wedding.ceremony.mapsLink}`)}` +
  `&location=${encodeURIComponent(`${venue.place.en}, ${venue.address.en}`)}`;
