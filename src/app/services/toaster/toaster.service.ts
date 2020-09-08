import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * Service to show toaster
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) {
   // this.iziToast = ; // global object
  }

  success(message: string) {
   // return this.toastr.success(message,timeOut: 3000);
    return this.toastr.success(message, '' ,{
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });


  }

  info(message: string) {
    // return this.toastr.info(message);
    return this.toastr.info(message, '' ,{
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  error(message: string) {
   // return this.toastr.error(message);
   return this.toastr.error(message, '' ,{
    timeOut: 3000,
    progressBar: true,
    closeButton: true,
  });
  }

  warning(message: string) {
    // return this.toastr.warning(message);
    return this.toastr.warning(message, '' ,{
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }
}
