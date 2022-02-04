import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../model/login.model";
import {LoginResponseModel} from "../../model/login-response.model";
import {Observable, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = "http://localhost:8080/api/public/login";
  constructor(private readonly httpClient: HttpClient) { }

  public login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(this.baseUrl, loginModel, { observe: 'response'}).pipe(map(response => {
      const authKey = response.headers.get("Authorization")!;
      let body = response.body!;
      body.authKey = authKey;
      return body;
    }));
  }
}
