import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';

// import * as $ from 'jquery';
// import 'bootstrap';

@Component({
    selector: 'modal-control',
    templateUrl: './modal.control.html',
    styleUrls: ['modal.control.css']
})

export class ModalControl implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() type: 'primary' | 'info' | 'success' | 'warning' | 'danger';
    @ViewChild('modal') modal: ElementRef;

    constructor() {
        
    }

    ngOnInit(): void {
        this.type = this.type || 'primary';
        $(this.modal.nativeElement).appendTo('body');
    }

    ngOnDestroy(): void {
        $(this.modal.nativeElement).remove();
    }

    open(): void {
        $(this.modal.nativeElement).modal('show');
    }

    close(): void {
        $(this.modal.nativeElement).modal('hide');
    }
}