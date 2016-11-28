import { Subscription } from 'rxjs/Subscription';
import { TwddServiceService } from './../twdd-service.service';

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  @Output() closeForm = new EventEmitter();
  twddForm: FormGroup;
  bankNum = [];
  bankValue = [];
  mytype = 2;
  isSend = false;
  wait = false;
  user = {};
  constructor(private fb: FormBuilder, private twddService: TwddServiceService) {
    this.twddForm = fb.group({
      name: "",
      idno: "",
      address: "",
      type: "現金匯款",
      coupon: "SOGO禮券",
      bankCode: "請選擇",
      bankName: "",
      bankAccount: "",
      _token: "",
      check: false
    })
  }

  ngOnInit() {
    this.twddForm.value['_token'] = this.twddService.getVcode();
    this.user = this.twddService.getUser();
    this.getBank();
  }

  //讀取銀行代碼資料
  getBank() {
    this.twddService.getBank().then(res => {
      this.bankNum = res;
      this.bankValue = this.bankNum.map((va) => va.slice(0, 3));
    })
  }


  checkId(string) {
    let re = /^[A-Z]\d{9}$/;
    if (re.test(string))
      return true;
    else
      return false;
  }

  onSubmit() {

    if (!this.twddForm.value.check) {
      alert('請同意活動條款及獎金稅務說明及發放說明');
      return;
    }


    if (this.wait) {
      return
    }

    this.wait = true;
    let txt = "";

    if (this.twddForm.value['type'] == 1) {
      this.twddForm.value['coupon'] = "";
      txt = `銀行代碼:${this.twddForm.value['bankCode']}
        分行:${this.twddForm.value['bankName']}
        銀行帳號:${this.twddForm.value['bankAccount']}`;
    } else {
      txt = `要申請的禮券:${this.twddForm.value['coupon']}`;
    }

    var conf = confirm(`請確認您的資料

        姓名:${this.twddForm.value['name']}
        身份證:${this.twddForm.value['idno']}
        地址:${this.twddForm.value['address']}
        ${txt}
      `);
    if (conf) {
      // test==================================================
      // this.onSubmitReady();
      // test==================================================


      this.twddService.sendApply(this.twddForm.value).subscribe(res => {
        if (res.status == 0) {
          alert(res.msg);
          this.wait = false;
        }
        if (res.status == 1) {
          this.onSubmitReady();
        }
      });
    } else {
      this.wait = false;
    }

  }

  //資料上傳後回到上個步驟
  onSubmitReady() {
    alert('資料已上傳');
    this.user['apply'] += this.user['income'];
    this.user['income'] = 0;
    this.twddService.changeUser(this.user);
    this.closeForm.emit();
  }


}
