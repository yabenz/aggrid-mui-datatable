
export function formatDate(isoDateStr: string): string {
  const date = new Date(isoDateStr);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
