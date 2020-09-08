import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  public user: {
    username: string;
    password: string;
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { 
                if (this.authService.userValue) {
                  this.router.navigate(['/']);
                }
                this.user = {
                  username: 'example1@email.com',
                  password: 'test@123',
                };
              }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  register() {
    this.router.navigateByUrl('register');
  }

  login() {
    // this.router.navigateByUrl('products');
    this.authService
      .login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }

  forgetPassword($event) {
    $event.preventDefault();
    this.router.navigateByUrl('forget-password');
  }

}
