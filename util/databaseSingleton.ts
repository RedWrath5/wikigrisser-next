import XLSX, { WorkBook } from "xlsx"

export class DBSingleton {
  private static instance: DBSingleton;

  private workbook: WorkBook;

  private constructor() {
    this.workbook = XLSX.readFile('data/database.xlsx');
  }

  static getInstance(): DBSingleton {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  
  getWorkBook(){
    return this.workbook;
  }

}