import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductAddComponent} from "./product-add/product-add.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'add-product', component: ProductAddComponent},
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] },
  {path: '**',
    component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
