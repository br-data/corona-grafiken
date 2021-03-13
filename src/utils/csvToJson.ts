// Converts a simple CSV to a JavaScript object
export const csvToJson = (
  csv: string,
  columnSeparator = ",",
  rowSeparator = "\n"
): any => {
  const inferType = (str: any) => {
    if (!str) {
      return;
    } else if (!isNaN(str) || !isNaN(str.replace(",", "."))) {
      return parseFloat(str.replace(",", "."));
    } else {
      return str.replace(/"/g, "");
    }
  };
  const [firstLine, ...lines] = csv
    .split(rowSeparator)
    .filter((line) => line.length);

  return lines.map((line) =>
    firstLine.split(columnSeparator).reduce((curr, next, index) => {
      return {
        ...curr,
        [next]: inferType(line.split(columnSeparator)[index]),
      };
    }, {})
  );
};
