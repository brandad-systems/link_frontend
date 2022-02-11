import { Injectable } from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {LoginModel} from "../../model/login.model";
import {LoginResponseModel} from "../../model/login-response.model";
import {Observable, map} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserModel} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  userModel!: UserModel;
  baseUrl: string = "http://localhost:8080/api";
  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) { }

  public login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(`${this.baseUrl}/public/login`, loginModel, { observe: 'response'}).pipe(map(response => {
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

      if(!this.jwtHelper.isTokenExpired(token)){

        this.httpClient.get<UserModel>(`${this.baseUrl}/admin/user/details`,
          { observe: 'response', headers: {'Authorization': "Bearer " + token }})
          .subscribe(response => {
          let body = response.body!;
          this.userModel.id = body.id;
          this.userModel.username = body.username;
          this.userModel.fullName = body.fullName;
          if(response.status == HttpStatusCode.Ok){
            return true;
          }
          return false;
        });
      }
      else {
        return false;
      }
      //TODO am Backend nach validität des Users Fragen

    } else {
      return false;
    }
  }



}
