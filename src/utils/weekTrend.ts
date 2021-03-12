export const weekTrend = <T extends { [key: string]: any; value: number }>(
  data: T[],
  threshold = 10,
  key = "value"
): number | undefined => {
  const currentWeek = data.slice(data.length - 9, data.length - 2);
  const previousWeek = data.slice(data.length - 16, data.length - 9);

  const currentWeekSum = currentWeek.reduce((sum, curr) => sum + curr[key], 0);
  const previousWeekSum = previousWeek.reduce(
    (sum, curr) => sum + curr[key],
    0
  );

  const percentChange =
    ((currentWeekSum - previousWeekSum) / previousWeekSum) * 100;

  const isDifferent = currentWeekSum !== previousWeekSum;
  const isBigEnough = currentWeekSum > threshold && previousWeekSum > threshold;

  let trend: number | undefined = isDifferent ? percentChange : 0;
  trend = isBigEnough ? trend : undefined;

  return trend;
};
