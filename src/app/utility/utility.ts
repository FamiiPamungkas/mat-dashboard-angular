import {DatePipe} from "@angular/common";

export function isValidNumber(input: string): boolean {
  return /^[0-9]+$/.test(input);
}

export function formatIsoDate(isoDate: string, format: string): string {
  try {
    const date = new Date(isoDate);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format) || "-";
  } catch (e) {
    return "-"
  }
}
