import XLSX from 'xlsx';
import { FAQ } from '../../types/faq';  // Assuming you have defined this type

export class FaqLoader {
  private workbook: XLSX.WorkBook;

  constructor(workbook: XLSX.WorkBook) {
    this.workbook = workbook;
  }

  load(): FAQ[] {
    const sheet = this.workbook.Sheets['FAQ']; // Data from 'FAQ' sheet
    const data: FAQ[] = XLSX.utils.sheet_to_json(sheet);
    return data;
  }
}
