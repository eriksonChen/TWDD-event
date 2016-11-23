import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html'
})
export class ForgetComponent implements OnInit {
  @Output() close = new EventEmitter();
  cell="";
  isSend=false;

  constructor() { }

  ngOnInit() {
  }

  sendPassowrd(){
    if(!this.isSend){
      console.log(this.cell);
      this.isSend=true;
    }
  }

  closeBtn() {
    this.isSend=false;
    this.close.emit();
  }

}
