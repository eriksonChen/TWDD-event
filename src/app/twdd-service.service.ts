import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwddServiceService {
  vcode:string;
  vcodePath="./assets/api/vcode.json";

  constructor(private http:Http) { }

  getVcode(){
      return this.http.get(this.vcodePath).map(res => res.json());
  }

}
