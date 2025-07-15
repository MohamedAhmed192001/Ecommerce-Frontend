import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpService } from '../../../../core/services/OTP/otp.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: false,
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  @Input() email!: string;
  @Input() pendingUserData!: any;

  otpForm: FormGroup;
  constructor(private fb: FormBuilder, private otpService: OtpService,
    private toastr: ToastrService, private authService: AuthService, private router: Router) {
    this.otpForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  verifyOtp() {
    const payload = {
      email: this.email,
      code: this.otpForm.value.code
    };

    this.otpService.verifyOtp(payload).subscribe({
      next: () => {
        this.registerUser();
      },
      error: () => { this.toastr.error("Invalid code. Please try again."); }
    })
  }

  registerUser(): void {
    this.authService.register(this.pendingUserData).subscribe({
      next: () => {
        this.toastr.success("Registration complete!");
        this.router.navigate(['/login']);
      },
      error: () => { this.toastr.error("Failed to register."); }
    })
  }
  

}
