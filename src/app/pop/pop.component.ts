import {Router} from '@angular/router';
import {Component,OnInit, Input} from '@angular/core';

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
  // @Input('user') private user:any;

  constructor(private router: Router) {
    this.onPage(this.router.url);
  }

  ngOnInit() {
    $('.popup').fadeIn('fast');
    // console.log(this.user);
  }

  onPage(str) {
    if (str.indexOf('note') != -1) {
      this.isNote = true;
    }
    if (str.indexOf('hist') != -1) {
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
    this.router.navigate(['']);
    $('.popup').fadeOut('fast');
  }

}
