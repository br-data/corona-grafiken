// Calculate the 7 day incidence per 100,000 people
export const incidence = <T extends { [key: string]: any; value: number }>(
  data: T[],
  population: number,
  key = "value"
): number => {
  const currentWeek = data.slice(data.length - 7, data.length);
  const cases = currentWeek.reduce((sum, curr) => (sum += curr[key]), 0);

  return (cases * 100000) / population;
};
