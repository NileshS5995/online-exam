import { Component, OnInit } from '@angular/core';
import { ResultService } from './../../services/result.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public result: any = [];
  isResult = false;
  fontColor = 'text-dark';
  constructor(public resultService: ResultService) { }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    this.resultService.getResult().subscribe((response: any) => {
      if (response.success) {
        this.result = response.data;
        if (this.result && !_.isEmpty(this.result)) {
          this.isResult = true;
        }
      } else {
        // this.handleError(response);
      }
    },
    (error) => {
      // this.handleError(error);
    }
  );
  }

  checkCorrectAnswer(question, key) {
    if (question.selected === key) {
      if (question.answer === key) {
        return  '<i class="fa fa-check text-success" aria-hidden="true"></i>';
      } else {
         return '<i class="fa fa-remove text-danger"></i>';
      }
    } else {
      return null;
    }
  }
  checkAnswerStatus(question, key) {
    if (question.selected === key ) {
      if (question.answer === question.selected) {
        return  'right-questions-background';
      } else if (question.answer !== question.selected)  {
         return 'wrong-questions-background';
      } else  {
        return 'attempted-questions-background';
      }

    } else {
      return '';
    }

  }
}
