import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'hello erikson!';
  form=false;
  login=false;
  fbapi='108756302487903';
  url='http://twdd.com.tw';
  fbpic='http://e3pcr.com/assets/img/fb.jpg';
  code:string;
  download="http://s.ad-locus.com/twdd";

  constructor(private router:Router){}

  ngOnInit(){
    this.code="abc123";
  }

  loginBtn(){

    this.loginTo();
  }

  loginTo(){
    $('.section1').slideUp();
    this.login=true;
  }

  noteBtn(){
    console.log('活動辦法');
    if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
    }
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
    console.log('服務 Q$A');
    if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
    }
  }

  homeBtn(){
    $( "body, html" ).animate({
			scrollTop: 0
		}, 600);
    if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
    }
  }

  getForm(){
    this.form=true;
    setTimeout(()=>{
      $( "body, html" ).animate({
        scrollTop: $('app-form').offset().top-50
      }, 600);
    },100);
  }

  shareFbBtn(){
    let title = "暢快飲酒，安全回家";
    let des = `昨晚酒後我花450元用APP呼叫酒後代駕，路上遇酒測攔檢，馬上現省九萬罰單。你也快下載 ${this.download}，期限內輸入我的推薦碼 ${this.code}，還送三趟百元⾞車車資折抵`;
    this.shareFb(this.url,title,des,this.fbpic);
  }


  shareFb(share_u:string, title:string, fb_des:string, pic:string) {
        console.log(this.url, this.fbapi);
        FB.ui({
          method: 'feed',
          link: share_u,
          caption: '台灣代駕',
          name:title,
          description:fb_des,
          picture:pic
        }, function(response){
          if(response){
            console.log(response.post_id);
          }else{
            console.log('no share');
          }
          
        });

        // let share_fb = `https://www.facebook.com/dialog/feed?app_id=${this.fbapi}&display=popup&caption&link=` +encodeURIComponent(share_u) +`&redirect_uri=${this.url}close.html&picture=` + encodeURIComponent(pic) +`&description=` + encodeURIComponent(fb_des) +`&name=` + encodeURIComponent(title);
        // window.open(share_fb, 'sharer', 'toolbar=0,status=0,width=625,height=583');
    }

}
