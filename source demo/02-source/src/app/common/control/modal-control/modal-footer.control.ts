import { Component } from '@angular/core';


@Component({
    selector: 'modal-footer',
    template: `<div class="modal-footer" style="padding:.5rem"><ng-content></ng-content></div>`
})
export class ModalFooterControl {

}