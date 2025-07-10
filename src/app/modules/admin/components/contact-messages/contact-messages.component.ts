import { Component } from '@angular/core';
import { Message } from '../../../../shared/models/ResponseDTOs/message';
import { ToastrService } from 'ngx-toastr';
import { ContactMessageService } from '../../../../core/services/contact-message/contact-message.service';

@Component({
  selector: 'app-contact-messages',
  standalone: false,
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.css'
})
export class ContactMessagesComponent {
  messages: Message[] = [];
  selectedMessageId: number | null = null;
  replyText: string = '';

  constructor(private messageService: ContactMessageService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => { this.messages = messages },
      error: (error) => { this.toastr.error('Error when feching messages') }
    })
  }

  setReplyTarget(id: number) {
    this.selectedMessageId = id;
    this.replyText = '';
  }

  sendReply() {
    if (!this.replyText || this.replyText.trim().length < 5) {
      this.toastr.warning("Reply is too short.");
      return;
    }

    this.messageService.replayOnMessage(this.selectedMessageId, this.replyText).subscribe({
      next: () => {
        this.toastr.success('Reply sent successfully.');
        this.selectedMessageId = null;
        this.loadMessages(); // Refresh the list
      },
      error: () => { this.toastr.error('Failed to send reply.') }
    })
  }

}
