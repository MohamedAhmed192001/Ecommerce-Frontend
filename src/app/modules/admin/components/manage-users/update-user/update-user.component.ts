import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user/user.service';
import { UserResponse } from '../../../../../shared/models/ResponseDTOs/user-response';
import { UpdateUserDto } from '../../../../../shared/models/UpdateDTOs/update-user-dto';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  updateForm: FormGroup;
  user: UserResponse = {
    id: '', userName: '', firstName: '',
    lastName: '', email: '', address: '', role: ''
  };
  userId: string | null;

  constructor(private route: ActivatedRoute, private userService: UserService,
    private fb: FormBuilder, private router: Router)
  {
    this.userId = route.snapshot.paramMap.get('userId');
    this.updateForm = fb.group({
      id: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      role: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.loadUser(this.userId);
  }

  loadUser(userId: any) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.updateForm.patchValue(user);
        console.log(user);

      },

      error: err => {
        console.error("Error when getting the user! ", err);
      }

    })
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedUser: UpdateUserDto =
      {
          firstName: this.updateForm.value.firstName,
          lastName: this.updateForm.value.lastName,
          address: this.updateForm.value.address,
          email: this.updateForm.value.email,
          role: this.updateForm.value.role,
      }

      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: success => {
          alert('User updated successfully!');
          this.router.navigate(['/admin/users']);
          console.log(success);
        },
        error: err => { console.error('Error occureed when updating user: ', err) }
      })
    }
    
  }


  isInvalid(field: any) {

  }
}

 


