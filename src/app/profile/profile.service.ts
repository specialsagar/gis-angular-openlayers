import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getClientProfile(){
    return this.http.get(environment.userServer + '/q/39qk0Byg?token=5Yhg2amZDinB9lmayECjhQ')
  }
}
