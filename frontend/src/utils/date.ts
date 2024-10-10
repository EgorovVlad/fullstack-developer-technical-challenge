export const formatDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
}).format;

export const formatStringDate = (date: string) => {
  return formatDate(new Date(date));
};
