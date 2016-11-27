import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { BANK } from './form/bank-data';

@Injectable()
export class TwddServiceService {
  vcode:string;
  checkPath = "http://event.twdd.com.tw/check";//檢查是否登入
  vcodePath = "http://event.twdd.com.tw/vcode";//讀取vcode, 用來做post的檢查
  loginPath = "http://event.twdd.com.tw/login";//user登入
  forgetPath = "http://event.twdd.com.tw/forget";//忘記密碼
  listPath = "http://event.twdd.com.tw/list";//請款記錄
  applyPath = "http://event.twdd.com.tw/apply";//申請獎金
  headers = new Headers();
  myuser:Object = {};
  apply_list = [];

  private user = new Subject<any>();
	missionUser$ = this.user.asObservable();

  constructor(private http:Http) {
    
  }

  setupVcode(vcode){
    this.vcode = vcode;
  }

  getVcode(){
    return this.vcode;
  }

  //設定User的資料
  changeUser(u:any){
    this.myuser = u;
    this.user.next(u);
    // this.user=u;
  }

  //讀取User的資料
  getUser(){
    return this.myuser;
  }
  
  //設定請款記錄
  changeList(arr){
    this.apply_list = arr;
  }

  //讀取請款記錄
  getList(){
    return this.apply_list;
  }

  //讀取各家銀行的代碼
  getBank():Promise<string[]>{
    return Promise.resolve(BANK);
  }

  //讀取vcode, 用來做post的檢查
  apiVcode(){
      return this.http.get(this.vcodePath).map(res => res.json());
  }

  //檢查是否有登入過
  checkLogin(){
      return this.http.get(this.checkPath).map(res => res.json());
  }

  //登入讀取user的資料
  apiLogin(da){
    return this.http.post(this.loginPath, da).map(res=>res.json());
  }

  //forget password 忘記密碼
  forgetPS(cell){
    return this.http.post(this.forgetPath, cell).map(res=>res.json());
  }

  //讀取請款記錄
  list(){
    return this.http.get(this.listPath).map(res=>res.json());
  }

  //送出獎金申請
  sendApply(data){
    return this.http.post(this.applyPath, data).map(res=>res.json());
  }

}
