import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import 'jqueryui';
import swal from 'sweetalert2';

@Injectable()
export class NotifyService {

  constructor() { }

  notify(html) {
    if (!$('#superdev-notify').length) {
      $('body').append(html);
      $('#superdev-notify').slideDown(500);
      setTimeout(() => {
        $('#superdev-notify').slideUp(500);
        setTimeout(() => {
          $('#superdev-notify').remove();
        }, 500);
      }, 3000);
    }
  }

  info(message: string) {
    let html = `<div id="superdev-notify" class="notify-info"><i class="fa fa-info-circle"></i> ${message}</div>`;
    this.notify(html);
  }

  success(message: string) {
    let html = `<div id="superdev-notify" class="notify-success"><i class="fa fa-check"></i> ${message}</div>`;
    this.notify(html);
  }

  error(message: string) {
    let html = `<div id="superdev-notify" class="notify-error"><i class="fa fa-times-circle"></i> ${message}</div>`;
    this.notify(html);
  }

  warning(message: string) {
    let html = `<div id="superdev-notify" class="notify-warning"><i class="fa fa-warning"></i> ${message}</div>`;
    this.notify(html);
  }

  confirm(message: string) {
    return new Promise(resolve => {
      swal({
        title: 'Xác nhận',
        html: message,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then(result => {
        if (result.value) resolve();
      });
    });
  }

  confirmWithInput(title: string){
    let input = null; 
    return new Promise((resolve)=>{
      swal({
        title: title,
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
          input = value;
        },
        allowOutsideClick: () => !swal.isLoading()
      }).then((result) => {
        if (result.value && input) {
          resolve(input);
        }
      })
    });    
  }
}
