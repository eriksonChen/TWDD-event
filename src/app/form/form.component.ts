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
  mytype = 2; //1: 現金匯款, 2:現金禮券
  isSend = false;
  wait = false;
  isCheck = false;
  user = {};
  actualAmount:number; //實際兌換獎金
  balance:number; //餘額

  constructor(private fb: FormBuilder, private twddService: TwddServiceService) {
    this.twddForm = fb.group({
      name: "",
      idno: "",
      address: "",
      type: "現金匯款",
      coupon: "SOGO禮券",
      bankCode: "",
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
    this.onCheckData();


    // let txt = "";

    // if (this.twddForm.value['type'] == 1) {
    //   this.twddForm.value['coupon'] = "";
    //   txt = `銀行代碼:${this.twddForm.value['bankCode']}
    //     分行:${this.twddForm.value['bankName']}
    //     銀行帳號:${this.twddForm.value['bankAccount']}`;
    // } else {
    //   txt = `要申請的禮券:${this.twddForm.value['coupon']}`;
    // }

    // var conf = confirm(`請確認您的資料
    //     姓名:${this.twddForm.value['name']}
    //     身份證:${this.twddForm.value['idno']}
    //     地址:${this.twddForm.value['address']}
    //     ${txt}
    //   `);


    // if (conf) {
    //   this.twddService.sendApply(this.twddForm.value).subscribe(res => {
    //     if (res.status == 0) {
    //       alert(res.msg);
    //       this.wait = false;
    //     }
    //     if (res.status == 1) {
    //       this.onSubmitReady();
    //     }
    //   });
    // } else {
    //   this.wait = false;
    // }

  }

  onCheckData() {
    if(this.mytype==1){//現金算法
      this.actualAmount = this.user['income']-30;
      this.balance = 0;
    }else{//禮券算法
      if( this.user['income']<130){
        alert('扣除30元手續費後，金額低於100元，無法兌換');
        this.wait = false;
        return;
      }
      let amount = this.user['income']-30;
      this.balance = amount - Math.floor((amount/100))*100;
      this.actualAmount = amount - this.balance;
    }

    $('.check-popup').fadeIn('fast');
  }


  //關閉確認視窗,不上傳資料
  closeBtn() {
    $('.check-popup').fadeOut('fast');
    this.wait = false;
  }

  //資料上傳後回到上個步驟
  onSubmitReady() {
    //test ======================================
    // this.twddService.changeUser(this.user);
    // this.closeForm.emit();
    //test ======================================

    this.user['apply'] += this.actualAmount;
    this.user['income'] = this.balance;

    this.twddService.sendApply(this.twddForm.value).subscribe(res => {
      if (res.status == 0) {
        alert(res.msg);
        this.wait = false;
      }
      if (res.status == 1) {
        alert('資料已上傳');
        this.twddService.changeUser(this.user);
        this.closeForm.emit();
      }
    });
  }

}
