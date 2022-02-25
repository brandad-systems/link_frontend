import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequestModel} from "../../model/login-request.model";
import {LoginResponseModel} from "../../model/login-response.model";
import {catchError, lastValueFrom, map, Observable, of} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserModel} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  userModel: UserModel = {id: '', username: '', fullName: ''};
  baseUrl: string = "http://localhost:8080/api/v1";


  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) {
  }

  public login(loginModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(`${this.baseUrl}/public/login`, loginModel, {observe: 'response'}).pipe(map(response => {
      const authKey = response.headers.get("Authorization")!;
      let body = response.body!;
      localStorage.setItem('token', authKey);
      body.authKey = authKey;
      return body;
    }));
  }


  public async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if(this.userModel) {
        return true;
      }
      return lastValueFrom(this.httpClient.get<UserModel>(`${this.baseUrl}/admin/user/details`)
        .pipe(map(response => {
          this.userModel.id = response.id;
          this.userModel.username = response.username;
          this.userModel.fullName = response.fullName;
          return true;
        }), catchError(error => of(false))));
    } else {
      return false;
    }
  }


}
