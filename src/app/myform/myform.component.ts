import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-form',
  styles: [`
      .error { color: crimson; }
      .success { color: green; }
  ` ],
  template: `
    <form #captchaProtectedForm="ngForm">
      <recaptcha
        [(ngModel)]="formModel.captcha"
        name="captcha"
        required
        siteKey="6LdAcwwUAAAAACAzbaFRJcalcqhxCzktmV_mbKw3"
        #captchaControl="ngModel"
      ></recaptcha>
      <div [hidden]="captchaControl.valid || captchaControl.pristine" class="error">Captcha must be solved</div>
      <div [hidden]="!captchaControl.valid" class="success">Captcha is valid</div>
      <div [hidden]="captchaProtectedForm.form.valid" class="error">The form must be filled out</div>
      <div [hidden]="!captchaProtectedForm.form.valid" class="success">The form is valid</div>
      <a class="btn btn-secondary login-btn" (click)="formModel.captcha = ''"><span>Reset Captcha</span></a>
    </form>
  `,
})
export class MyformComponent implements OnInit {
  formModel = {};

  constructor() { }

  ngOnInit() {
  }

}
