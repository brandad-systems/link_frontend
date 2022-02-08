import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import SpyObj = jasmine.SpyObj;
import {LoginService} from "../services/login.service";
import createSpyObj = jasmine.createSpyObj;
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpyService: SpyObj<LoginService>;

  beforeEach(async () => {
    loginSpyService = createSpyObj('LoginService', ['login']);
    loginSpyService.login.and.returnValue(of({id: '', fullName: '', username: '', authKey: ''}))

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{provide: LoginService, useValue: loginSpyService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Not Login When Inputs Are Empty', () => {
    // Given:
    const button = fixture.debugElement.query(By.css('#login_button'));
    // When
    button.nativeElement.click();
    // Then
    expect(loginSpyService.login).not.toHaveBeenCalled();
  });

  it('Should login when inputs are valid', () => {

  });

  it('Should reroute to welcome page after successfull login', () => {

  });

  it('Should display error message when login failed', () => {

  });

  it('Should not login when only email is set', () => {

  });

  it('Should not login when only password is set', () => {

  });

  it('autofocus should set to email input', () => {

  });
});
