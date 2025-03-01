export default async function parseTimestamp(mongoDbId: string) {
  const timestamp = mongoDbId.toString().substring(0, 8);

  const date = new Date(parseInt(timestamp, 16) * 1000).toLocaleTimeString();

  return date;
}
