export type DatePickerPrecision = "month" | "year";

export const parsePickerValue = (
  value: string,
  precision: DatePickerPrecision
): Date => {
  if (precision === "year" && /^\d{4}$/.test(value)) {
    return new Date(Number(value), 0, 1, 12);
  }

  const monthYearMatch = /^(\d{1,2})\/(\d{4})$/.exec(value);
  if (monthYearMatch) {
    return new Date(Number(monthYearMatch[2]), Number(monthYearMatch[1]) - 1, 1, 12);
  }

  const webMonthMatch = /^(\d{4})-(\d{2})$/.exec(value);
  if (webMonthMatch) {
    return new Date(Number(webMonthMatch[1]), Number(webMonthMatch[2]) - 1, 1, 12);
  }

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (isoDateMatch) {
    return new Date(
      Number(isoDateMatch[1]),
      Number(isoDateMatch[2]) - 1,
      Number(isoDateMatch[3]),
      12
    );
  }

  return new Date();
};

export const formatPickerValue = (
  date: Date,
  precision: DatePickerPrecision
): string => {
  const year = date.getFullYear().toString();
  if (precision === "year") {
    return year;
  }

  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${year}`;
};

export const pickerValueToInputDate = (
  value: string,
  precision: DatePickerPrecision
): string => {
  if (!value) {
    return "";
  }

  if (precision === "year" && /^\d{4}$/.test(value)) {
    return `${value}-01-01`;
  }

  if (precision === "month" && /^\d{1,2}\/\d{4}$/.test(value)) {
    const [month, year] = value.split("/");
    return `${year}-${month.padStart(2, "0")}`;
  }

  const monthYearMatch = /^(\d{1,2})\/(\d{4})$/.exec(value);
  if (monthYearMatch) {
    const month = monthYearMatch[1].padStart(2, "0");
    return `${monthYearMatch[2]}-${month}-01`;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
};

export const parseInputDate = (
  value: string,
  precision: DatePickerPrecision
): Date | null => {
  if (precision === "month") {
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) {
      return null;
    }

    return new Date(Number(match[1]), Number(match[2]) - 1, 1, 12);
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    12
  );
};

export const isPickerValueBefore = (
  value: string,
  otherValue: string,
  precision: DatePickerPrecision
): boolean => {
  const date = parsePickerValue(value, precision);
  const otherDate = parsePickerValue(otherValue, precision);

  if (precision === "year") {
    return date.getFullYear() < otherDate.getFullYear();
  }

  return (
    date.getFullYear() * 12 + date.getMonth() <
    otherDate.getFullYear() * 12 + otherDate.getMonth()
  );
};
