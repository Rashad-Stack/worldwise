export default function formateDate(date: string | undefined): string {
  if (!date) return "Date not found";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
