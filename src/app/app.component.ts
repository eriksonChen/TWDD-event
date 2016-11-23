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
  download="http://event.twdd.com.tw/check.html?na=";
  code:string;//認證碼
  vcode:string;
  user:Object={phone:"", password:""};
  subs:Subscription;

  constructor(private router:Router, private twddService:TwddServiceService ){}

  ngOnInit(){
    this.code = 'asdf1234';
    this.user['name']='子莊';
    this.subs = this.twddService.getVcode().subscribe(res =>{
      this.vcode = res.vcode;
      console.log(`get vcode = ${this.vcode}`);
    },
    err => {
      console.log('Error fetching data');
    });
  }

  onLogin(){
    if(this.user['captcha']){
      this.loginTo();
    }else{
      alert('請勾選我不是機器人');
    }
  }
  loginTo(){
    $('.section1').slideUp();
    this.login=true;
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
    window.open("http://www.twdd.com.tw/download/");
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
    let fb_des = `昨晚酒後我花450元用APP呼叫酒後代駕，路上遇酒測攔檢，馬上現省九萬罰單。你也快下載台灣代駕APP，期限內輸入我的推薦碼 ${this.code}，還送三趟百元車資折抵`;
    let line_des = `昨晚酒後我花450元用APP呼叫酒後代駕，路上遇酒測攔檢，馬上現省九萬罰單。你也快下載  ${encodeURIComponent(downloadUrl)} ，期限內輸入我的推薦碼 ${this.code}，還送三趟百元車資折抵`;
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
