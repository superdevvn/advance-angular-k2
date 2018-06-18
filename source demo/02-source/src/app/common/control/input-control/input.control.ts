import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, Output, EventEmitter, SimpleChanges, forwardRef } from '@angular/core';

import * as uuid from 'uuid';
import * as $ from 'jquery';
import 'bootstrap';
import { NgForm, NgControl, NgModel, FormControl } from '@angular/forms';

@Component({
    selector: 'input-control',
    templateUrl: './input.control.html'
})

export class InputControl {
    name = uuid.v4();

    @Input() form: NgForm;
    @Input() label: string;

    _model: any;
    @Input() set model(value) {
        setTimeout(() => {
            this._model = value;
        }, 0);
    };
    @Output() modelChange = new EventEmitter();

    // Optional
    @Input() required: boolean;
    @Input() maxlength: number;
    @Input() pattern: string;
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