import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultComponent} from './components/result/result.component';
import { AddQuestionsComponent } from './components/add-questions/add-questions.component';
import { CaptureComponent } from './components/capture/capture.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers/auth.guard'


const routes: Routes = [
  {
    path: 'questions/:categoryId', component: QuestionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'result', component: ResultComponent, canActivate: [AuthGuard]
  },
  {
     path: 'add-questions', component: AddQuestionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'capture', component: CaptureComponent, pathMatch: 'full',
  },
  {
    path: '', component: HomeComponent, pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
