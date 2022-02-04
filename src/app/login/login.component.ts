import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../../model/login.model";
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


   loginModel:LoginModel = {username:'', password:''};


  constructor(private readonly loginService: LoginService) { }



  ngOnInit(): void {
  }

  onSubmit():void{
    this.loginService.login(this.loginModel).subscribe(result => console.log(result), error => console.log(error));
  }

}
