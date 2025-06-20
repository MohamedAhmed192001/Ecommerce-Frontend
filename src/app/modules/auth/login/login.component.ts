import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { envirnment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //private apiUrl = '${envirnment.apiUrl}/auth';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private toastr: ToastrService, private cartService: CartService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe(
      {
        next: (response) => {
          if (response && response.token) {
            this.toastr.info('You are now logged in.');
            localStorage.setItem('token', response.token);
            this.cartService.getCart();

            // ✅ Navigate to /products after token is saved
            this.router.navigate(['/home']);
          } else {
            this.toastr.error('No token received');
          }
        },
          error: (error) => {
            localStorage.removeItem('token'); // Clean up any old token
            this.toastr.error('Invalid email or password');
            console.error(error);
          }
      })

    }
  }


}
