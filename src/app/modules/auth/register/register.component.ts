import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from '../../../core/services/OTP/otp.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSubmited = false;

  otpSent = false;
  emailForOtp!: string;
  pendingUserData!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private otpService: OtpService,
    private router: Router, private toastr: ToastrService) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  sendOtp() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value?.toString();

      this.otpService.sendOtp(email).subscribe({
        next: () => {
          this.otpSent = true;
          this.emailForOtp = email;
          this.pendingUserData = this.registerForm.value;
        },
        error: () => {
          this.toastr.error("Error when sending OTP");
        }
      })
    }
  }



}
