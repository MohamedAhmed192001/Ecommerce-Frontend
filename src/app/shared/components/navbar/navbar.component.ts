import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token)
      return true
    else
      return false
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean
  {
    var role = this.authService.getUserRole();
    if (role == 'Admin')
      return true
    else
      return false
  }

}
