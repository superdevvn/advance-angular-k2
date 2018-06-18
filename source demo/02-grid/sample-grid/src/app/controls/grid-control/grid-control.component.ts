import { Component, OnInit, Input } from '@angular/core';
import { GridOption } from './grid-control.model';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {
  @Input() gridOption: GridOption;
  items: any[] = [];
  constructor(private http: Http) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    let headers = new Headers();
    headers.append('Auth-SuperDev', 'T7g4AXn3TCQL77zI8QDi16sORDXScffXXgnQ/mE5P38CESS5LXagKECtX5xw0cD+');
    this.http.post(this.gridOption.url, {}, { headers }).toPromise().then(res => {
      this.items = res.json();
    }).catch(err => {
      console.log(err);
    });
  }
}
