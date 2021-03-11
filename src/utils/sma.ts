// Calculate the simple moving average
export const sma = <T extends { [key: string]: any; value: number }>(
  data: T[],
  steps = 7,
  key = "value"
): T[] => {
  return data
    .map((obj: T, index: number) => {
      const offset = index - Math.floor(steps / 2);
      const window = data.slice(offset, steps + offset);

      return Object.assign({}, obj, {
        value:
          window.reduce((sum: number, curr: any) => {
            return curr[key] ? sum + curr[key] : null;
          }, 0) / window.length,
      });
    })
    .filter((d: any) => d.value);
};
