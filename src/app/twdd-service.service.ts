import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class TwddServiceService {
  vcode:string;
  checkPath = "http://event.twdd.com.tw/check";
  vcodePath = "http://event.twdd.com.tw/vcode";
  loginPath = "http://event.twdd.com.tw/login";
  forgetPath = "http://event.twdd.com.tw/forget";
  listPath = "http://event.twdd.com.tw/list";
  applyPath = "http://event.twdd.com.tw/apply";
  headers = new Headers();
  user:Object = {};
  apply_list = [];

  constructor(private http:Http) {
    this.getVcode().subscribe(res =>{
      this.vcode = res.vcode;
      this.headers.append('X-CSRF-TOKEN', this.vcode);
      // console.log(`get vcode = ${this.vcode}`);
      // $.ajaxSetup({
      //   headers: {
      //       'X-CSRF-TOKEN': `${this.vcode}`
      //     }
      // });
    },
    err => {
      console.log('Error fetching data');
    });
    
  }

  getUser(){
    return this.user;
  }

  changeUser(u:Object){
    this.user=u;
  }

  getVcode(){
      return this.http.get(this.vcodePath).map(res => res.json());
  }

  checkLogin(){
      return this.http.get(this.checkPath).map(res => res.json());
  }

  //login data
  apiLogin(da){
    // var data = $.param(da);
    return this.http.post(this.loginPath, da).map(res=>res.json());
  }

  //forget password
  forgetPS(cell){
    return this.http.post(this.forgetPath, cell).map(res=>res.json());
  }

  list(){
    return this.http.get(this.listPath).map(res=>res.json());
  }

  sendApply(data){
    return this.http.post(this.applyPath, data).map(res=>res.json());
  }

  changeList(arr){
    this.apply_list = arr;
  }

  getList(){
    return this.apply_list;
  }

  
}
