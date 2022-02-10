import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {AutoFocus} from "./utils/auto-focus.directive";
import {AuthGuard} from "./guards/auth.guard";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AutoFocus

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
    }, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
