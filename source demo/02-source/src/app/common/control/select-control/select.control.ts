import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, Output, EventEmitter, SimpleChanges, forwardRef } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import * as uuid from 'uuid';
import * as $ from 'jquery';
import 'bootstrap';
import { NgForm, NgControl, NgModel, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'select-control',
    templateUrl: './select.control.html'
})

export class SelectControl {
    name = uuid.v4();

    @Input() form: NgForm;
    @Input() label: string;
    @Input() items: {
        value: string;
        display: string;
    }[] = [];

    _model: any;
    @Input() set model(value) {
        setTimeout(() => {
            this._model = value;
        }, 0);
    };
    @Output() modelChange = new EventEmitter();

    // Optional
    @Input() required: boolean;
    @Input() disabled: boolean;

    @ViewChild('formModel') formModel: NgModel;
    constructor() {
    }

    ngOnInit() {
        if (this.form) {
            this.form.addControl(this.formModel);
        }
    }

    ngAfterViewInit() {
    }

    change(value) {
        this._model = value;
        this.modelChange.emit(this._model);
    }
}