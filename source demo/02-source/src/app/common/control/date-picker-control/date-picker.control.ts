import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import * as Chart from 'chart.js';
import * as uuid from 'uuid';
import { NgbDateStruct, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'date-picker-control',
    templateUrl: './date-picker.control.html'
})
export class DatePickerControl implements OnInit {
    @Input() label: string;
    @Input()
    set model(val) {
        setTimeout(() => {
            if (val) this._model = new Date(val);
            else {
                this._model = new Date();
            }
            this.modelChange.emit(this.datePipe.transform(this._model, 'yyyy/MM/dd'));
        }, 0);
    }
    @Output() modelChange = new EventEmitter();

    _model: any;

    constructor(private datePipe: DatePipe) {
    }

    ngOnInit() {
    }

    change(val) {
        this._model = val;
        this.modelChange.emit(this.datePipe.transform(this._model, 'yyyy/MM/dd'));
    }
}