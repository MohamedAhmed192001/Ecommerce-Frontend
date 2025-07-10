import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  isAuthenticated = false;
  isAdmin = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    
    if (token) {
      this.isAuthenticated = true;
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAdmin = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false;

    }
     
  }
}
