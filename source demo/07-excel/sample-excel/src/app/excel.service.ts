import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
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

  }
}
