import { QuestionsService } from './../../services/questions.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultService } from './../../services/result.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from './../../services/toaster/toaster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  @ViewChild('questionForm') questionForm: any;
  public questions: any = [];
  public question;
  public rightAnswer;
  public totalAnswered;
  public redirectUrl = '/result';
  public previous = 0;
  public next = 0;
  public disabledPrevious = 'active';
  public disabledNext = 'active';
  public closeResult: string;
  public categoryId: any;
  constructor(public questionsService: QuestionsService, public resultService: ResultService, public router: Router, 
  private modalService: NgbModal, public toasterService: ToasterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.getQuestions(this.categoryId);
  });
  }

  getQuestions(categoryId) {
    this.questionsService.getQuestions(categoryId).subscribe(
      (response: any) => {
        if (response.success) {
          this.questions = response.data;
          this.getQuestionsById(this.questions[0].id);
        } else {
          // this.handleError(response);
        }
      },
      (error) => {
        // this.handleError(error);
      }
    );
  }

  getQuestionsById(id) {
    this.questionsService.getQuestionsById(id).subscribe(
    (response: any) => {
      if (response.success) {
        this.question = response.data;
        if (this.question.id === this.questions[0].id) {
          this.next = this.question.id + 1;
          this.disabledPrevious = 'disabled';
        } else if (this.question.id === this.questions.length ) {
          this.previous =  this.question.id - 1;
          this.disabledNext = 'disabled';
        } else {
          this.next = this.question.id + 1;
          this.previous = this.question.id - 1;
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

  submitTest() {
    this.getQuestions(this.categoryId);
    this.rightAnswer = 0;
    this.totalAnswered = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if ('selected' in this.questions[i] && (this.questions[i]['selected'] != null)) {
        this.totalAnswered++;
        if (this.questions[i]['selected'] == this.questions[i]['answer']) {
          this.questions[i]['status'] = 'right';
          this.rightAnswer++;
        } else {
          this.questions[i]['status'] = 'wrong';
        }
      } else {
        this.questions[i]['status'] = 'NotAttempted';
      }
    }
    const NotAttempted = this.questions.length - this.totalAnswered;
    const WrongAnswer = this.totalAnswered - this.rightAnswer;
    const result = {
      rightAnswer: this.rightAnswer,
      totalAnswered: this.totalAnswered,
      notAttempted: NotAttempted,
      wrongAnswer: WrongAnswer,
      questions: this.questions
    };
    this.setResult(result);
    this.modalService.dismissAll();
    this.toasterService.success('Test Successfuly Submitted');
    this.router.navigateByUrl("/result");
  }

  submitAnswer(id, skip?) {
    if ((this.question.selected && this.question.selected !== null) || skip ) {
      const selectedValue = skip ? skip : this.question.selected;
      this.questionsService.submitAnswer(id, selectedValue,this.categoryId).subscribe(
        (response: any) => {
          if (response.success) {
            this.questions = response.data;
            if (skip === 'Reset') {
              this.toasterService.warning('Answer Reset successfully...');
            } else if (skip === 'skip') {
              this.toasterService.info('Answer Skipped successfully...');
            } else if ( this.question.selected) {
              this.toasterService.success('Answer submitted successfully...');
            }
          } else {

          }
        },
        (error) => {
        }
      );
    } else {
      this.toasterService.warning('Please Select the option...');
    }
  }

  setResult(result) {
    this.resultService.setResult(result).subscribe((response: any) => {
      if (response.success) {
      } else {
      }
    },
    (error) => {
    }
  );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
