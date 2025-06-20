import { Component } from '@angular/core';
import { UserResponse } from '../../../../shared/models/ResponseDTOs/user-response';
import { UserService } from '../../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users: UserResponse[] = [];

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: users => { this.users = users; console.log(users) },
      error: err => {
        this.toastr.error('Error when fetching users');
        console.error("Error when fetching users! ", err)
      }
    })

  }


  deleteUser(userId: string) {
    confirm('Are you sure to delete this user?');
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toastr.success('User deleted successfully');
        this.users = this.users.filter(u => u.id !== userId);
      },
      error: err => {
        this.toastr.error('Error when deleting user');
        console.error("Error when deleting user! ", err)
      }
    })
  }

}
