export default function formatDate(date: string): string {
  return !isNaN(Date.parse(date))
    ? new Date(date).toLocaleDateString(undefined, {
        timeZone: "UTC",
      })
    : date;
}
