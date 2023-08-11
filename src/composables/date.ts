// TODO プラグイン化したい
export function useDayOfWeek(date: Date) {
  return `${["日", "月", "火", "水", "木", "金", "土"][date.getDay()]}`
}