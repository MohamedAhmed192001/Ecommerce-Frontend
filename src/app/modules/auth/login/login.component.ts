import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { envirnment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //private apiUrl = '${envirnment.apiUrl}/auth';
  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
            localStorage.setItem('token', response.token);
            this.successMessage = "Login Successful!";
            console.log("Token saved:", response.token);

            // ✅ Navigate to /products after token is saved
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = "No token received!";
          }
        },
          error: (error) => {
            localStorage.removeItem('token'); // Clean up any old token
            this.errorMessage = "Invalid email or password.";
            console.error(error);
          }
      })

    }
  }


}
