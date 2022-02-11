import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../model/login.model";
import {LoginResponseModel} from "../../model/login-response.model";
import {catchError, lastValueFrom, map, Observable, of} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserModel} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  userModel: UserModel = {id: '', username: '', fullName: ''};
  baseUrl: string = "http://localhost:8080/api";


  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) {
  }

  public login(loginModel: LoginModel): Observable<LoginResponseModel> {
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
      return lastValueFrom(this.httpClient.get<UserModel>(`${this.baseUrl}/admin/user/details`,
        {observe: 'response', headers: {'Authorization': "Bearer " + token}})
        .pipe(map(response => {
          let body = response.body!;
          this.userModel.id = body.id;
          this.userModel.username = body.username;
          this.userModel.fullName = body.fullName;
          return true;
        }), catchError(error => of(false))));
    } else {
      return false;
    }
  }


}
