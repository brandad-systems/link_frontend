import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../model/login.model";
import {LoginResponseModel} from "../../model/login-response.model";
import {Observable, map} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  baseUrl: string = "http://localhost:8080/api/public/login";
  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) { }

  public login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(this.baseUrl, loginModel, { observe: 'response'}).pipe(map(response => {
      const authKey = response.headers.get("Authorization")!;
      let body = response.body!;
      localStorage.setItem('token', authKey);
      body.authKey = authKey;
      return body;
    }));
  }


  public async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if(token) {
      //Token valid
      return !this.jwtHelper.isTokenExpired(token);
      //TODO am Backend nach validität des Users Fragen
    } else {
      return false;
    }
  }


}
