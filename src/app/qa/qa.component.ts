import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-qa',
  templateUrl: './qa.component.html'
})
export class QaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    gapage('服務Q&A');
  }

}
