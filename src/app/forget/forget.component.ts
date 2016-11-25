import { TwddServiceService } from './../twdd-service.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html'
})
export class ForgetComponent implements OnInit {
  @Output() close = new EventEmitter();
  cell="";
  isSend=false;
  vcode="";

  constructor(private twddService:TwddServiceService) { 
    this.twddService.getVcode().subscribe(res =>{
      this.vcode = res.vcode;
    })
  }

  ngOnInit() {
  }

  sendPassowrd(){
    if(!this.isSend){
      this.submitCell();
    }
  }

  submitCell(){
    let obj={cell:this.cell};
    // $.ajax({
    //   type: 'POST',
    //   url: 'http://event.twdd.com.tw/forget',
    //   data: $.param(this.cell),
    //   success: (res)=>{
    //     if(res.status==0){
    //       alert(res.msg);
    //       this.isSend=false;
    //     }
    //     if(res.status==1){
    //       this.isSend=true;
    //     }
    //   },
    //   dataType: 'json'
    // });
    this.twddService.forgetPS(obj).subscribe(res => {
      console.log(res);
      if(res.status==0){
        alert(res.msg);
        this.isSend=false;
      }
      if(res.status==1){
        this.isSend=true;
      }
    })
  }

  closeBtn() {
    this.isSend=false;
    this.close.emit();
  }

}
