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

  constructor(private router:Router){}

  ngOnInit(){

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
        scrollTop: $('app-form').offset().top
      }, 600);
    },100);
    
  }
}
