import { Component } from '@angular/core';
import { MyMessage } from '../../../../models/ResponseDTOs/my-message';
import { ContactMessageService } from '../../../../../core/services/contact-message/contact-message.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-messages',
  standalone: false,
  templateUrl: './my-messages.component.html',
  styleUrl: './my-messages.component.css'
})
export class MyMessagesComponent {

  myMessages: MyMessage[] = [];

  constructor(private messageService: ContactMessageService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loadMyMessages();
  }

  loadMyMessages(): void {
    this.messageService.getMyMessages().subscribe({
      next: (messages) => { this.myMessages = messages },
      error: () => { this.toastr.error('Error when feching your messages') }
    })
  }

  confirmDelete(messageId: number) {
    confirm("Are you sure to delete this message");
    this.messageService.removeMessage(messageId).subscribe({
      next: () => {
        this.toastr.success("Message removed successfully");
        this.myMessages = this.myMessages.filter(m => m.id != messageId);
      },
      error: () => { this.toastr.error('Error when removing message') }

    })

  }

}
