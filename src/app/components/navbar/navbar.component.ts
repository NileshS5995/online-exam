import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarCollapsed = true;
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }
  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout($event) {
    $event.preventDefault();
    this.authService.logout();
  }
}
