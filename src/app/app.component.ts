import { Component } from '@angular/core';

import { AuthService} from './services/auth.service'
import { User } from './data/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jokeApp';
  user: User;

  constructor(private authService: AuthService){
      this.user = this.authService.getAuthUser();
  }

  isLoggedIn():Boolean{
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }
}
