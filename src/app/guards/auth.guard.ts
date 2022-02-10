import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserRepositoryService} from "../services/user-repository.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: UserRepositoryService, public router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.auth.isAuthenticated().then(isValid => {
      if (!isValid) {
        this.router.navigate(['']);
      }
      return isValid;
    });
  }

}
