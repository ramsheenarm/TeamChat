import { Injectable } from '@angular/core';
import { User, Country } from './chat/shared/model/user';
import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ChatService {
  private userdetails:User;
  constructor(private http: HttpClient) { }
  setValue(user:User) {
    console.log('Set value called and values is :' + user);
    this.userdetails= user;
  }
  getValue() {
    console.log('get value called and values is :' + this.userdetails);
    return this.userdetails;
  }
  GetCountryData(){
    return this.http.get<Country[]>('https://restcountries.eu/rest/v2/all');
    // ,
    //   {
    //     headers :new HttpHeaders({
    //       'content-type': 'application/json',
    //       'access-control-allow-origin':'*'
    //     })
    //   });
  }
  
}
