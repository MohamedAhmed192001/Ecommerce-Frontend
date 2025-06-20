import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token)
      return true
    else
      return false
  }
}
