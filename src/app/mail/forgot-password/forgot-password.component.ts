import { MailService } from './../../services/mail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: any = {};
  isSended = false;
  isSendedFailed = false;
  errorMessage = '';

  constructor(private mailService: MailService) { }

  ngOnInit() {
    this.isSended = false;
    this.isSendedFailed = false;
  }


  onSubmit() {
    console.log(this.form);

    this.mailService.send(this.form.email).subscribe(
      data => {
        this.isSended = true;
        this.isSendedFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSendedFailed = true;
      }
    );

  }

}
