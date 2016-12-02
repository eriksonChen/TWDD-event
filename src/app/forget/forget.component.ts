import { TwddServiceService } from './../twdd-service.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html'
})
export class ForgetComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() vcode:string;
  cell="";
  isSend=false;

  constructor(private twddService:TwddServiceService) { 
  }

  ngOnInit() {
  }

  sendPassowrd(){
    if(!this.isSend){
      gaclick('忘記密碼送出');
      this.submitCell();
    }
  }

  submitCell(){
    let obj={cell:this.cell, _token:this.vcode};
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
