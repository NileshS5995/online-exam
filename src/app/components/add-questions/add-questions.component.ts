import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup , FormControl, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from './../../services/questions.service';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  public addQuestionsForm: FormGroup;
  formIsInvalid = false;
  constructor(public formBuilder: FormBuilder, public questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.initializeFormFields();
  }
  initializeFormFields(): void {
    this.addQuestionsForm = this.formBuilder.group({
      question: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched();
    });
  }

  saveQuestions() {
    if (!this.addQuestionsForm.valid) {
      this.formIsInvalid = true;
      this.validateAllFormFields(this.addQuestionsForm);
    } else {
        this.questionsService.addQuestion(this.addQuestionsForm.value).subscribe((response: any) => {
          if (response.success) {
            // console.log(response.data);
          //  this.toasterService.success('Questions successfully Added.....');
          }
        (error) => {
          // this.handleError(error);
          }
          },
        );
      }
    }
}
export function answerValidator(control: AbstractControl) {
  if (control.value) {
    const answer = control.value.toLowerCase();
    if ( answer === 'a' || answer === 'b' || answer === 'c' || answer === 'd') {
      return { validAnswer: true };
    }
    } else {
      return null;
    }
  return null;
}
