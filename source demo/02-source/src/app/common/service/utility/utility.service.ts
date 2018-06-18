import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import 'jqueryui';
import swal from 'sweetalert2';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class UtilityService {

  constructor(private notifyService: NotifyService) { }

  handleError(err) {
    if (typeof (err) === 'string') {
      this.notifyService.error(err);
    } else if (typeof (err) === 'object') {
      if(err.Message) this.notifyService.error(err.Message);
      else if(err.json && typeof (err.json) === 'function' && err.json().Message) this.notifyService.error(err.json().Message);
      else this.notifyService.error('UNKNOWN_ERROR');
    } else {
      this.notifyService.error('UNKNOWN_ERROR');
    }
  }
}
