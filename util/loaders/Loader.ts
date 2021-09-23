import { CellObject, WorkBook, WorkSheet } from "xlsx/types";
import { ColIdMap, FINAL_COL_KEY } from "../columnHeaders";

export abstract class Loader<T> {
  constructor(protected workBook: WorkBook) {}
  abstract load(): T;

  protected getCellValue(cellObj: CellObject | undefined) {
    if (!cellObj) return null;
    if (cellObj.w) return cellObj.w;

    if (cellObj.v) return cellObj.v;

    if (cellObj.f) return cellObj.f;

    return null;
  }

  protected mapColumnHeadersToColumnIds(
    columnHeaders: { [key: string]: string[] },
    sheet: WorkSheet
  ) {
    return Object.keys(columnHeaders).reduce((accumulator, key) => {
      const value = columnHeaders[key];
      let rowNumber = 1;
      let columnId = "A";
      value.forEach((columnIdToFind) => {
        columnId = this.scanForHeaderString(
          columnIdToFind,
          sheet,
          rowNumber,
          columnId
        );
        rowNumber++;
      });
      accumulator[key] = columnId;
      return accumulator;
    }, {} as ColIdMap);
  }

  protected scanForHeaderString(
    headerToFind: string,
    sheet: WorkSheet,
    rowNumberToScan: number,
    colIdToStartOn: string = "A"
  ): string {
    let currentCol = colIdToStartOn;
    let notDone = true;

    while (notDone) {
      const cellId = currentCol + rowNumberToScan;
      const cellValue = this.getCellValue(sheet[cellId]);

      if (cellValue === FINAL_COL_KEY) {
        notDone = false;
        console.error("Column Key not Found", headerToFind);
      }

      if (cellValue === headerToFind) {
        notDone = false;
        return currentCol;
      }
      currentCol = this.getNextKey(currentCol);
    }

    return "";
  }

  protected getNextKey(key: string): string {
    // https://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
    if (key === "Z" || key === "z") {
      return (
        String.fromCharCode(key.charCodeAt(0) - 25) +
        String.fromCharCode(key.charCodeAt(0) - 25)
      ); // AA or aa
    } else {
      var lastChar = key.slice(-1);
      var sub = key.slice(0, -1);
      if (lastChar === "Z" || lastChar === "z") {
        // If a string of length > 1 ends in Z/z,
        // increment the string (excluding the last Z/z) recursively,
        // and append A/a (depending on casing) to it
        return (
          this.getNextKey(sub) +
          String.fromCharCode(lastChar.charCodeAt(0) - 25)
        );
      } else {
        // (take till last char) append with (increment last char)
        return sub + String.fromCharCode(lastChar.charCodeAt(0) + 1);
      }
    }
  }
}
