import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, Output, EventEmitter, SimpleChanges, forwardRef } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import * as uuid from 'uuid';
import * as $ from 'jquery';
import 'bootstrap';
import { NgForm, NgControl, NgModel, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'autocomplete-control',
    templateUrl: './autocomplete.control.html'
})

export class AutocompleteControl {
    name = uuid.v4();

    @Input() form: NgForm;
    @Input() label: string;
    @Input() items: {
        value: string;
        display: string;
    }[] = [];

    filteredItems: Observable<{
        value: string;
        display: string;
    }[]>;

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
        this.filteredItems = this.formModel.valueChanges.pipe(
            startWith<string | { value: string, display: string }>(''),
            map(item => typeof item === 'string' ? item : (item ? item.display : '')),
            map(name => name ? this.filter(name) : this.items)
        );
    }

    ngAfterViewInit() {
    }

    change(item) {
        if (typeof item === 'string') {
            this._model = item;
        } else {
            this._model = item ? item.value : undefined;
        }
        this.modelChange.emit(this._model);
    }

    private change_alias(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/ + /g, " ");
        str = str.trim();
        return str;
    }

    filter(value: string): { value: string, display: string }[] {
        return this.items.filter(item => this.change_alias(item.display.toLowerCase()).indexOf(this.change_alias(value.toLowerCase())) !== -1);
    }

    displayFn = (value: string | { value: string, display: string }): string | undefined => {
        if (typeof value === 'string') {
            if (!this.items) return undefined;
            let selectedItem = this.items.find(item => item.value === value);
            if(selectedItem) return selectedItem.display;
            if(this.items.some(item => item.display.toLowerCase().indexOf(value.toLowerCase()) !== -1)){
                return value;
            } else return undefined;
        } else {
            return value ? value.display : undefined;
        }
    }
}