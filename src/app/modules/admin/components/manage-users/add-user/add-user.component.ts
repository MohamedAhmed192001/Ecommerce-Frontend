import { Component } from '@angular/core';
import { UserService } from '../../../../../core/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreate } from '../../../../../shared/models/CreateDTOs/user-create';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder,
    private router: Router, private toastr: ToastrService)
  {
    this.userForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: UserCreate = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        address: this.userForm.value.address,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      }

      this.userService.addUser(user).subscribe({
        next: () => {
          this.toastr.success('User added successfully');
          this.router.navigate(['admin/users']);
        },

        error: err => {
          this.toastr.error('Error when adding the user');
          console.error("Error when adding the user! ", err);
        }

      })
    }

  }

  isInvalid(field: string) {

  }

}
