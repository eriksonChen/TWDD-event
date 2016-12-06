import { EventsitePage } from './../../e2e/app.po';
import { TwddServiceService } from './twdd-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy{
  recaptchaSiteKey = '6LdAcwwUAAAAACAzbaFRJcalcqhxCzktmV_mbKw3';
  form = false;
  login = false;
  isForget = false;
  fbapi='1035112683277194';
  url='http://twdd.com.tw';
  fbpic='http://event.twdd.com.tw/2016/assets/img/fb2.jpg';
  twddapp="https://goo.gl/kIoR15";
  download="http://event.twdd.com.tw/2016/check.html?na=";
  code:string;//認證碼
  user:Object = {};
  userLogin:Object = {cell:"", password:""};
  vcode="";
  captcha="";
  subs:Subscription;
  income:string;
  isTest = false;//是否測試用....========================================
  apply_list=[];

  testUser:Object = {
    UserName : "劉子莊",
    income:300,
    shareTime:[],
    code:"A1B2C3",
    used:[19, 12, 3, 2],
    apply:0,
    total:300
  }

  testList = [{
    no: 27,
    money: 200,
    type: "禮券（SOGO禮券）",
    fee: 30,
    time: "2016-12-05 11:18"
  },
  {
    no: 28,
    money: 600,
    type: "禮券（SOGO禮券）",
    fee: 30,
    time: "2016-12-03 10:10"
  }];

  //test =============================================================

  constructor(private router:Router, private twddService:TwddServiceService ){
    this.twddService.missionUser$.subscribe(res => {
      // console.log(res);
      this.user = res;
      this.code=this.user['code'];
      this.user['usedTotal']=res['used'][0]+res['used'][1]+res['used'][2]+res['used'][3];
    })
  }

  ngOnInit(){
    gapage('index');
    // test=======================================================================================
    if(this.isTest){
      console.log('is test version');
      this.vcode = "test123456789";
      this.userLogin = {cell:"0936173312", password:"611003"};
      this.twddService.setupVcode(this.vcode);
      return;
    }
    // test=======================================================================================

    this.subs = this.twddService.apiVcode().subscribe(res =>{
      this.vcode = res.vcode;
      this.twddService.setupVcode(this.vcode);
      this.checkInfo();
    },
    err => {
      console.log('Error fetching data');
    });
  }

  checkInfo(){
    this.twddService.checkLogin().subscribe(res =>{
      if(res.status==0){
        // console.log('還沒登入');
      }
      //已登入直接到下一步
      if(res.status==1){
        // this.loginTo();
        this.nextStep(res);
      }
    },
    err => {
      // console.log('Error fetching data');
    });
  }

  onLogin(){
    if(this.isTest){
      this.loginTo();
      return;
    }

    if(this.captcha){
      this.loginTo();
    }else{
      alert('請勾選我不是機器人');
    }
    
    gaclick('login_btn');
  }

  loginTo(){
    this.userLogin['_token'] = this.vcode;
    this.twddService.apiLogin(this.userLogin).subscribe(res => {
      if(res.status==0){
        alert(res.msg);
      }
      if(res.status==1){
        this.nextStep(res);
      }
    },
    err => {
      this.nextStep(this.testUser);
    });
  }

  //登入後進到下一步
  nextStep(res){
    this.twddService.changeUser(res);

    $('.section1').slideUp();
    this.login=true;
    this.getList();
    
  }

  getList(){
    // test 用 ======================================
    if(this.isTest){
      this.twddService.changeList(this.testList);
      this.apply_list = this.testList;
      console.log('get my list');
      return;
    }
    // test 用 ======================================

    this.twddService.list().subscribe(res => {
      if(res.status==0){
        alert(res.msg);
      }
      if(res.status==1){
        this.twddService.changeList(res.data);
        this.apply_list = res.data;
      }
    })
  }

  //忘記密碼
  forgetBtn(){
    this.isForget=true;
    gaclick('forget_btn');
  }
  closeForget(ev){
    this.isForget=false;
  }
  noteBtn(){
    this.onSliderUP();
    gaclick('活動辧法');
  }
  historyBtn(){
    gaclick('分享記錄_btn');
    if(this.user['shareTime'].length==0){
      alert('您目前無任何分享記錄');
      return;
    }
    this.router.navigate(['/pop/history']);
  }
  detailsBtn(){
    // console.log('詳情說明');
    gaclick("詳情說明_btn");
  }
  exchangeBtn(){
    gaclick("兌換記錄_btn");
    if(this.apply_list.length==0){
      alert('您目前無任何兌換記錄');
      return;
    }
    this.router.navigate(['/pop/exchange']);
  }
  qaBtn(){
    this.onSliderUP();
  }

  appBtn(){
    gaclick("下載APP_btn");
    window.open(this.twddapp);
  }

  homeBtn(){
    $( "body, html" ).animate({
			scrollTop: 0
		}, 600);
    this.onSliderUP();
    gaclick('home_btn');
  }

  onDownBtn(){
    let tar = $('.section1').css('display')=='block' ? $('.section1') : $('.section2');
    $( "body, html" ).animate({
      scrollTop: tar.offset().top-50
    }, 600);
  }

  //打開form表
  getForm(){
    gaclick("兌換獎金_btn");
    if(this.user['income']==0){
      alert('您目前無任何獎金可申請');
      return;
    }

    if(this.user['income']<100){
      alert('因手續費問題,低於100元無法兌換');
      return;
    }

    this.form=true;
    setTimeout(()=>{
      $( "body, html" ).animate({
        scrollTop: $('app-form').offset().top-50
      }, 600);
    },100);
  }

  //關掉form表
  formClose(){
    $('app-form').slideUp(()=>{
      this.form = false;
    });
  }

  onSliderUP(){
    if($('.navbar-toggle').css('display') !='none'){
          $(".navbar-toggle").trigger( "click" );
      }
  }

  shareBtn(type){
    let title = "暢快飲酒，安全回家";
    let downloadUrl =` ${this.download}${this.user['UserName']}&code=${this.code}`;
    let fb_des = `開車去喝酒，酒後找台灣代駕，10公里內450元起，嚴格篩選司機，享代駕責任保險。
                  快下載APP，${this.twddapp}，使用邀請碼 ${this.code}，註冊會員再享前三趟100元共300元折扣`;
    let line_des = `開車去喝酒，酒後找台灣代駕，10公里內450元起，嚴格篩選司機，享代駕責任保險，快下載APP ${encodeURIComponent(downloadUrl)} ，使用邀請碼 ${this.code}，註冊會員再享前三趟100元共300元折扣`;
    if(type=="fb"){
      this.shareFb(downloadUrl,title,fb_des,this.fbpic);
      gaclick('share_facebook');
    }
    if(type=='line'){
      this.shareLine(line_des);
      gaclick("share_line");
    }
  }

  shareFb(share_u: string, title: string, fb_des: string, pic: string) {
    FB.ui({
      method: 'feed',
      link: share_u,
      caption: '台灣代駕',
      name: title,
      description: fb_des,
      picture: pic
    }, (response)=> {
      if (response) {
        // console.log(response.post_id);
      } else {
        // console.log('no share');
      }
    });
  }

  shareLine(str){
    let url = 'http://line.naver.jp/R/msg/text/?'+str;
    window.open(url);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }


  formatNumber(n) {
    let str=n+"";
		if (str.length <= 3) {
			return str;
		} else {
			return this.formatNumber(str.substr(0, str.length - 3)) + ',' + str.substr(str.length - 3);
		}
	}

}
