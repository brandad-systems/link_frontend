import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'link_frontend';

  checkAccessToken(){
    //prüfe access token auf gültigkeit
    //route weiter auf Welcome Page
  }
}
