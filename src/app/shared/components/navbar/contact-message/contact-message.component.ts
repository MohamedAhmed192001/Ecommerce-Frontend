import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactMessageService } from '../../../../core/services/contact-message/contact-message.service';

@Component({
  selector: 'app-contact-message',
  standalone: false,
  templateUrl: './contact-message.component.html',
  styleUrl: './contact-message.component.css'
})
export class ContactMessageComponent {
  contactForm: FormGroup;


  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private messageService: ContactMessageService) {
    this.contactForm = fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }



  onSubmit() {
    if (this.contactForm.valid) {
      const formData = new FormData();

      formData.append('subject', this.contactForm.value.subject);
      formData.append('message', this.contactForm.value.message);

      this.messageService.submitMessage(formData).subscribe({
        next: () => {
          this.toastr.success('Message sent successfully');
        },
        error: () =>
        {
          this.toastr.error('Error when sending the message');
        }
      })
    }
  }

}
