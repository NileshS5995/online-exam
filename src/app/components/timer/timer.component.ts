import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input('noOfQuestions') noOfQuestions: number;
  @Input('redirectUrl') redirectUrl;
  constructor(public router: Router) { }
    timeLeft: number;
    interval;
  ngOnInit(): void {
    this.timeLeft = this.noOfQuestions * 30;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.router.navigateByUrl(this.redirectUrl);
        }
      } else {
        this.timeLeft = 60;
      }
    } , 1000 );
  }
}
