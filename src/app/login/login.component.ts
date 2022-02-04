import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../../model/login.model";
import {LoginService} from "../services/login.service";
import {HomeComponent} from "../home/home.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage :string = '';


  loginModel:LoginModel = {username:'', password:''};

  constructor(private readonly loginService: LoginService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.loginService.login(this.loginModel).subscribe(result => {
      console.log(result);
      this.router.navigate(['home']);
      this.errorMessage = '';
    },
        error =>  this.errorMessage ='Leider konnten wir Sie nicht einloggen, ' +
          'da Sie falsche Daten eingegeben haben. Bitte überprüfen Sie Ihre Angaben noch einmal.' );
  }
}
