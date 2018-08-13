import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
type AOA = Array<Array<any>>;

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  importId = uuid.v4();
  constructor() { }
  import(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // B1: Append input type="file" with id using jquery
      let html = `<input id="${this.importId}" type="file" style="display:none">`;
      $('body').append(html);
      // B2: Event change file
      $(`#${this.importId}`).change((evt: any) => {
        try {
          const target: DataTransfer = <DataTransfer>(evt.target);
          if (target.files.length !== 1) throw 'Cannot use multiple files';
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            let lines = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            let records = [];
            let headers = lines[0];
            lines.splice(0, 1);
            lines.forEach(line => {
              let record = {};
              let hasValue = false
              headers.forEach((header, index) => {
                record[header] = line[index];
                if (line[index] !== undefined && line[index] !== null && line[index].toString()) hasValue = true;
              });
              if (hasValue) records.push(record);
            });
            // B4: Remove input element
            $(`#${this.importId}`).remove();
            resolve(records);
          };
          reader.readAsBinaryString(target.files[0]);
        } catch (err) {
          // B4: Remove input element
          $(`#${this.importId}`).remove();
          reject(err);
        }
      });

      // B3: Trigger event click
      $(`#${this.importId}`).trigger('click');
    });
  }

  export(items: any[]): void {
    /* Worksheet */
    let worksheet = XLSX.utils.json_to_sheet(items, { cellDates: true });
    /* Workbook */
    let workbook = XLSX.utils.book_new();
    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    /* Set style header */
    // let firstSheetName = workbook.SheetNames[0];
    // let firstSheet = workbook.Sheets[firstSheetName];
    // let cell = firstSheet['A1'];
    // cell.s = { fill: { fgColor: { rgb: "86BC25" } } };
    // console.log(cell);

    let wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    let fileName = this.current() + '.xlsx';
    saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), fileName);
  }

  private current(): string {
    let now = new Date();
    return (now.getFullYear() + "/" + ("0" + now.getDate()).slice(-2)) + "/" + ("0" + (now.getMonth() + 1)).slice(-2) + " " + (now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
  }

  private s2ab(s): ArrayBuffer {
    let buffer = new ArrayBuffer(s.length);
    let view = new Uint8Array(buffer);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buffer;
  }
}
