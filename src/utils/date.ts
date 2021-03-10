export const germanDate = (dateString: string) => {
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);

  return date.toLocaleDateString('de-DE', options);
}

export const germanDateShort = (dateString: string) => {
  const options: any = { month: 'numeric', day: 'numeric' };
  const date = new Date(dateString);

  return date.toLocaleDateString('de-DE', options);
}

export const dateRange = (startDate: Date | string, endDate: Date | string, steps: number) => {
  const dateArray = [];
  const currentDate = new Date(endDate);

  while (currentDate >= new Date(startDate)) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    // Use UTC date to prevent problems with timezones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() - steps);
  }

  return dateArray.reverse();
}
