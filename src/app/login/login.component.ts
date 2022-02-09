import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../../model/login.model";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  loginForm: FormGroup = this.formBuilder.group({
    username: ['',Validators.required],
    password:['', Validators.required]
  });

  loginModel: LoginModel = {username: '', password: ''};

  constructor(private readonly loginService: LoginService, private readonly router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.loginModel.username = this.loginForm.get('username')?.value.trim();
    this.loginModel.password = this.loginForm.get('password')?.value;
    this.loginService.login(this.loginModel).subscribe(result => {
        console.log(result);
        this.router.navigate(['home']);
        this.errorMessage = '';
      },
      error => this.errorMessage = 'Leider konnten wir Sie nicht einloggen, ' +
        'da Sie falsche Daten eingegeben haben. Bitte überprüfen Sie Ihre Angaben noch einmal.');
  }
}
