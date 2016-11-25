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
  recaptchaSiteKey  = '6LdAcwwUAAAAACAzbaFRJcalcqhxCzktmV_mbKw3'; 
  form = false;
  login = false;
  isForget = false;
  fbapi='1035112683277194';
  url='http://twdd.com.tw';
  fbpic='http://event.twdd.com.tw/assets/img/fb2.jpg';
  twddapp="http://s.ad-locus.com/twdd";
  download="http://event.twdd.com.tw/check.html?na=";
  code:string;//認證碼
  user:Object = {};
  userLogin:Object = {cell:"0915444555", password:"assdf"};
  vcode="";
  captcha="";
  subs:Subscription;

  constructor(private router:Router, private twddService:TwddServiceService ){}

  ngOnInit(){
    this.code = 'asdf1234';
    this.user['name']='子莊';
    this.subs = this.twddService.getVcode().subscribe(res =>{
      this.vcode = res.vcode;
      console.log(`get vcode = ${this.vcode}`);
      $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': `${this.vcode}`
          }
      });
    },
    err => {
      console.log('Error fetching data');
    });

    

  }

  logError(err) {
    alert('error: ' + err);
  }

  onLogin(){
    if(this.captcha){
      this.loginTo();
    }else{
      alert('請勾選我不是機器人');
    }
  }
  loginTo(){
    console.log(this.userLogin);
    // $.ajax({
    //   type: 'GET',
    //   url: 'http://event.twdd.com.tw/login',
    //   data: $.param(this.userLogin),
    //   success: (res)=>{
    //     console.log(res);
    //     $('.section1').slideUp();
    //   this.login=true;
    //   },
    //   dataType: 'json'
    // });
    this.twddService.apiLogin(this.userLogin, this.vcode).subscribe(res => {
      console.log(res);
      $('.section1').slideUp();
      this.login=true;
    })
  }
  noteBtn(){
    this.onSliderUP();
  }
  historyBtn(){
    console.log('分享記錄');
  }
  detailsBtn(){
    console.log('詳情說明');
  }
  exchangeBtn(){
    console.log('兌換記錄');
  }
  qaBtn(){
    this.onSliderUP();
  }

  appBtn(){
    window.open(this.twddapp);
  }

  homeBtn(){
    $( "body, html" ).animate({
			scrollTop: 0
		}, 600);
    this.onSliderUP();
  }

  onDownBtn(){
    let tar = $('.section1').css('display')=='block' ? $('.section1') : $('.section2');
    $( "body, html" ).animate({
      scrollTop: tar.offset().top-50
    }, 600);
  }

  //忘記密碼
  forgetBtn(){
    this.isForget=true;
  }
  closeForget(ev){
    this.isForget=false;
  }

  getForm(){
    this.form=true;
    setTimeout(()=>{
      $( "body, html" ).animate({
        scrollTop: $('app-form').offset().top-50
      }, 600);
    },100);
  }

  onSliderUP(){
    if($('.navbar-toggle').css('display') !='none'){
          $(".navbar-toggle").trigger( "click" );
      }
  }

  shareBtn(type){
    let title = "暢快飲酒，安全回家";
    let downloadUrl =` ${this.download}${this.user['name']}&code=${this.code}`;
    let fb_des = `開車去喝酒，酒後找台灣代駕，10公里內450元起，嚴格篩選司機，享代駕責任保險。
                  快下載APP，${this.twddapp}，使用邀請碼 ${this.code}，註冊會員再享前三趟100元共300元折扣`;
    let line_des = `開車去喝酒，酒後找台灣代駕，10公里內450元起，嚴格篩選司機，享代駕責任保險，快下載APP ${encodeURIComponent(downloadUrl)} ，使用邀請碼 ${this.code}，註冊會員再享前三趟100元共300元折扣`;
    if(type=="fb"){
      this.shareFb(downloadUrl,title,fb_des,this.fbpic);
    }
    if(type=='line'){
      this.shareLine(line_des);
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
    // let share_fb = `https://www.facebook.com/dialog/feed?app_id=${this.fbapi}&display=popup&caption&link=` +encodeURIComponent(share_u) +`&redirect_uri=${this.url}close.html&picture=` + encodeURIComponent(pic) +`&description=` + encodeURIComponent(fb_des) +`&name=` + encodeURIComponent(title);
    // window.open(share_fb, 'sharer', 'toolbar=0,status=0,width=625,height=583');
  }

  shareLine(str){
      console.log(str);
    let url = 'http://line.naver.jp/R/msg/text/?'+str;
    window.open(url);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
