import { TwddServiceService } from './twdd-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy{
  recaptchaSiteKey  = '6LdAcwwUAAAAACAzbaFRJcalcqhxCzktmV_mbKw3'; 
  form=false;
  login=false;
  fbapi='108756302487903';
  url='http://twdd.com.tw';
  fbpic='http://e3pcr.com/assets/img/fb.jpg';
  code:string;//認證碼
  vcode:string;
  user:Object={phone:"", password:""};
  download="http://s.ad-locus.com/twdd";
  subs:Subscription;

  constructor(private router:Router, private twddService:TwddServiceService ){}

  ngOnInit(){
    this.code = 'asdf1234';
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
      console.log(this.user['captcha']);
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
    let des = `昨晚酒後我花450元用APP呼叫酒後代駕，路上遇酒測攔檢，馬上現省九萬罰單。你也快下載 ${this.download}，期限內輸入我的推薦碼 ${this.code}，還送三趟百元⾞車車資折抵`;
    if(type=="fb"){
      this.shareFb(this.url,title,des,this.fbpic);
    }
    if(type=='line'){
      this.shareLine(des);
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
        console.log(response.post_id);
      } else {
        console.log('no share');
      }
    });
    // let share_fb = `https://www.facebook.com/dialog/feed?app_id=${this.fbapi}&display=popup&caption&link=` +encodeURIComponent(share_u) +`&redirect_uri=${this.url}close.html&picture=` + encodeURIComponent(pic) +`&description=` + encodeURIComponent(fb_des) +`&name=` + encodeURIComponent(title);
    // window.open(share_fb, 'sharer', 'toolbar=0,status=0,width=625,height=583');
  }

  shareLine(str){
    let url = 'http://line.naver.jp/R/msg/text/?'+encodeURIComponent(str)
    window.open(url);
  }


    ngOnDestroy(){
      this.subs.unsubscribe();
    }

}
