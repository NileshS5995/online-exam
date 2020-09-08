import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Output('redirectBtnClicked') redirectBtnClicked = new EventEmitter();
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('showRedirectBtn') showRedirectBtn: boolean;
  @Input('redirectBtnLabel') redirectBtnLabel: string;
  @Input('redirectUrl') redirectUrl: string;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.title = this.title || '404 Page Not Found';
    this.description =
      this.description ||
      'The page you are looking for is not found. Please click on the button below to browse the products.';
    this.redirectBtnLabel = 'Start Test';
    this.redirectUrl = this.redirectUrl || '/questions';
    this.showRedirectBtn =
    this.showRedirectBtn === undefined ? true : this.showRedirectBtn;
  }

  redirectToUrl() {
    this.redirectBtnClicked.emit();
    this.router.navigateByUrl(this.redirectUrl);
  }

}
