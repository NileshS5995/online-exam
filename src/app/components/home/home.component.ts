import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './../../services/questions.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public categoris: any = [];
  constructor(public questionsService: QuestionsService, public router: Router) { }

  ngOnInit(): void {
    this.categories();
  }

  categories() {
    this.questionsService.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categoris = response.data;
        } else {
          // this.handleError(response);
        }
      },
      (error) => {
        // this.handleError(error);
      }
    );
  }

  redirectToDetails(categoryId) {
    this.router.navigateByUrl(`/questions/${categoryId}`);
  }

}
