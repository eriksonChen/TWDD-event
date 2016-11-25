import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwddServiceService {
  vcode:string;
  vcodePath = "http://event.twdd.com.tw/vcode";
  loginPath = "http://event.twdd.com.tw/login";
  headers = new Headers();

  constructor(private http:Http) {
    // this.headers.append('Content-Type', 'application/json');
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    

    
  }

  getVcode(){
      return this.http.get(this.vcodePath).map(res => res.json());
      
  }

  //test post data
  apiLogin(da,vcode){
    this.headers.append('X-CSRF-TOKEN', vcode);
    var data = $.param(da);
    return this.http.post(this.loginPath, data, { headers: this.headers }).map(res=>res.json());
  }
  
}
