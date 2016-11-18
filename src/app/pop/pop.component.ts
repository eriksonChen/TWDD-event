import {Router} from '@angular/router';
import {Component,OnInit} from '@angular/core';

@Component({
  // selector: 'app-pop',
  templateUrl: './pop.component.html'
})
export class PopComponent implements OnInit {
  page = "";
  isNote = false;
  isHistory = false;
  isQa = false;
  isDetails = false;
  isExchange = false;

  constructor(private router: Router) {
    this.onPage(this.router.url);
  }

  ngOnInit() {
    $('.popup').fadeIn('fast');
  }

  onPage(str) {
    console.log(str);
    if (str.indexOf('note') != -1) {
      this.isNote = true;
    }
    if (str.indexOf('history') != -1) {
      this.isHistory = true;
    }
    if (str.indexOf('details') != -1) {
      this.isDetails = true;
    }
    if (str.indexOf('qa') != -1) {
      this.isQa=true;
    }
    if (str.indexOf('exchange') != -1) {
      this.isExchange=true;
    }
  }

  closeBtn() {
    this.router.navigate([''])
  }

}