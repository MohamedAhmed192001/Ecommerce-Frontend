import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSubmited = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private toastr: ToastrService) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () =>
        {
          this.toastr.success('Registered successfully! Please confirm your email before login');
          this.registerSubmited = true;
          setTimeout(() => { this.router.navigate(['/login']) }, 3000);
        },
        error: () => {
          this.toastr.error('Registration failed. Try a different email');

        }
      })
    }
  }



}
