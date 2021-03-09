// Calculate the simple moving average
export const sma = (data: Object[], steps = 7, key = 'value') => {
  return data.map((obj: Object, index: number) => {
    const offset = index - Math.floor(steps / 2);
    const window = data.slice(offset, steps + offset);

    return Object.assign({}, obj, {
      value: window.reduce((sum: number, curr: any) => {
        return curr[key] ? sum + curr[key] : null;
      }, 0) / window.length
    });
  }).filter((d: any) => d.value);
}
