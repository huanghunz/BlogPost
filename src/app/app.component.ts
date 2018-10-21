import { Component } from '@angular/core';

import { AuthService} from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jokeApp';

  constructor(private authService: AuthService){

  }

  isLoggedIn():Boolean{
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }
}
