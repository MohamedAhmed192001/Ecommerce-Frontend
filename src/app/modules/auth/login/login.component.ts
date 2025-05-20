import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { envirnment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          localStorage.setItem('token', response.token);
          this.successMessage = "Login Successfull!"
          console.log("Login Successfull!");
          // Redirect user here if needed
        },
          error: (error) => {
            this.errorMessage = "Invalid email or password!";
            console.log(error);
          }
      })

    }
  }


}
