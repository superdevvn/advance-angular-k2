import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comboBox: string;
  firstName: string;
  lastName: string;
  isRequired: boolean;

  constructor(){
    this.comboBox = '';
  }
  @ViewChild('form') form: NgForm;
  save(){
    this.form.form.markAsPristine();
  }
}
