import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount = 0;
  isAuthenticated = false;
  userName = '';
  isAdmin = false


  constructor(private router: Router, private authService: AuthService,
  private cartService: CartService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAuthenticated = true;
      this.userName = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.isAdmin = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false;

      // Load cart count from CartService
      const userId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
      this.cartCount = cart?.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }
  }

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

  

}
