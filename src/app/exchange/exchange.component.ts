import { TwddServiceService } from './../twdd-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-exchange',
  templateUrl: './exchange.component.html'
})
export class ExchangeComponent implements OnInit {
  apply_list=[];

  constructor(private twddService:TwddServiceService) { }

  ngOnInit() {
    this.apply_list = this.twddService.getList();
  }

}
