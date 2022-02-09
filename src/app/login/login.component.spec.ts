import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import SpyObj = jasmine.SpyObj;
import {LoginService} from "../services/login.service";
import createSpyObj = jasmine.createSpyObj;
import {of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {routes} from "../app-routing.module";
import {Location} from "@angular/common";
import {AutoFocus} from "../utils/auto-focus.directive";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpyService: SpyObj<LoginService>;
  let location: Location;
  beforeEach(waitForAsync(() => {
    loginSpyService = createSpyObj('LoginService', ['login']);
    loginSpyService.login.and.returnValue(of({id: '', fullName: '', username: '', authKey: ''}));

    TestBed.configureTestingModule({
      declarations: [ LoginComponent, AutoFocus ],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [{provide: LoginService, useValue: loginSpyService}]
    })
    .compileComponents();
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
    expect(new AutoFocus(fixture.debugElement.query(By.css('#login_button')))).toBeTruthy();
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
    //given
    component.loginForm.setValue({
      username: 'test@test.de',
      password: 'testes'
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();
    //when
    button.nativeElement.click();
    // Then
    expect(loginSpyService.login).toHaveBeenCalled();
  });

  it('Should reroute to welcome page after successfull login', fakeAsync(() => {
    //given
    component.loginForm.setValue({
      username: 'test@test.de',
      password: 'testes'
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();
    //when
    button.nativeElement.click();
    tick();
    // Then
    expect(location.path()).toBe('/home');
  }));

  it('Should display error message when login failed', fakeAsync(() => {
    //given
    loginSpyService.login.and.returnValue(throwError(() => new Error('Some error message')));
    component.loginForm.setValue({
      username: 'test@test.de',
      password: 'testes'
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();
    //when
    button.nativeElement.click();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('#login_error'));
    // Then
    expect(loginSpyService.login).toHaveBeenCalled();
    expect(component.errorMessage).toBeTruthy();
    expect(errorMessage).toBeTruthy();
  }));

  it('Should not login when only email is set', () => {
    component.loginForm.setValue({
      username: 'test@test.de',
      password: ''
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();
    //when
    button.nativeElement.click();
    // Then
    expect(loginSpyService.login).not.toHaveBeenCalled();
  });

  it('Should not login when only password is set', () => {
    component.loginForm.setValue({
      username: '',
      password: 'testes'
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();
    //when
    button.nativeElement.click();
    // Then
    expect(loginSpyService.login).not.toHaveBeenCalled();
  });

  it('autofocus should set to email input', () => {
    //given
    const usernameElement = fixture.debugElement.query(By.css('#email'));
    const elementWithFocus = document.activeElement;
    const autofocusDirective = fixture.debugElement.query(By.directive(AutoFocus));
    expect(autofocusDirective).toBeTruthy();
    expect(usernameElement).toBeTruthy();
    expect(elementWithFocus).toEqual(usernameElement.nativeElement);
    expect(elementWithFocus).toEqual(autofocusDirective.nativeElement);
  });

  it('labels (email/password) should be hidden on form load', () => {
    //given
    expect(fixture.debugElement.query(By.css('#emailLabel'))
      .nativeElement.hasAttribute('hidden')).toEqual(true);

    expect(fixture.debugElement.query(By.css('#passwordLabel'))
      .nativeElement.hasAttribute('hidden')).toEqual(true);
  });

  it('Input fields(email/password) should not be initialized on first time load', () => {
    //given
    expect(fixture.debugElement.query(By.css('#email'))
      .nativeElement.value).toBe('');

    expect(fixture.debugElement.query(By.css('#password'))
      .nativeElement.value).toBe('');
  });

  it('username does not contain a empty space by mistake', () => {
    // Given:
    component.loginForm.setValue({
      username: 'test@test.de ',
      password: 'testes'
    });
    const button = fixture.debugElement.query(By.css('#login_button'));
    fixture.detectChanges();

    // When
    button.nativeElement.click();
    // Then
    expect(loginSpyService.login).toHaveBeenCalledOnceWith({username:'test@test.de',password:'testes'});

  });
});
