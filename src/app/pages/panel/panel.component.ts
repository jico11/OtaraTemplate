import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelService } from 'app/services/panel.service';
import { ContactService } from 'app/services/contact.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF;
  };
  return buf;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  showText: Boolean = true;
  json: any;
  temp: Array<any> = [];
  data: AOA;
  //wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };

  constructor(private router: Router, private _myCommunicationService: PanelService, private _postService: ContactService) {
    
        // Subscribe to the service event
        _myCommunicationService.changeEmitted$.subscribe(myMessage => {
          this.showText = myMessage;
        });
    
      }

  ngOnInit() {
  }

  CreatePost() {
    this.showText = !this.showText;
    this.router.navigate(['/panel/create_post']);
  }

  EditPost() {
    this.showText = !this.showText;
    this.router.navigate(['/panel/edit_post']);
  }

//  excel() {
//    this._postService.getWorks()
//      .subscribe(res => {
//        this.temp = res;
//      });
//  }

  atras() {
    this.showText = !this.showText;
    this.router.navigate(['/panel']);
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length != 1) { throw new Error("Cannot upload multiple files on the entry") };
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {

    //this._postService.getWorks()
    //  .subscribe(res => {
    //    this.json = res;
    //    this.temp.push(["Nombre", "Email", "Especialidad", "Razon", "Actividad"])
    //    for (var i = 0; i < this.json.length; i++) {
    //      this.temp.push([this.json[i].nombre, this.json[i].email, this.json[i].especialidad, this.json[i].razon, this.json[i].actividad])
    //    }

  //      this.data = this.temp;

        /* generate worksheet */
  //      const ws = XLSX.utils.aoa_to_sheet(this.data);

        /* generate workbook and add the worksheet */
  //      const wb = XLSX.utils.book_new();
  //      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        //const wbout = XLSX.write(wb, this.wopts);
  //      const date = new Date();

  //      const fileName = "Registros " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ".xlsx";

        //saveAs(new Blob([s2ab(wbout)]), fileName);

  //    });


  }

}
