import { TwddServiceService } from './../twdd-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  user:Object={};

  constructor(private twddService:TwddServiceService) { }

  ngOnInit() {
    this.user = this.twddService.getUser();
  }

}
