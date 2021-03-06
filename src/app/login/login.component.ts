import {Component, OnInit} from '@angular/core';
import {LoginRequestModel} from "../../model/login-request.model";
import {UserRepositoryService} from "../services/user-repository.service";
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

  loginData: LoginRequestModel = {username: '', password: ''};

  constructor(private readonly loginService: UserRepositoryService, private readonly router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
      this.loginService.isAuthenticated().then(isValid => {
        if(isValid){
          this.router.navigate(['/home'])
        }
      })
  }

  onSubmit(): void {
    this.loginData.username = this.loginForm.get('username')?.value.trim();
    this.loginData.password = this.loginForm.get('password')?.value;
    this.loginService.login(this.loginData).subscribe(result => {
        console.log(result);
        this.router.navigate(['home']);
        this.errorMessage = '';
      },
      error => this.errorMessage = 'Leider konnten wir Sie nicht einloggen, ' +
        'da Sie falsche Daten eingegeben haben. Bitte überprüfen Sie Ihre Angaben noch einmal.');
  }
}
