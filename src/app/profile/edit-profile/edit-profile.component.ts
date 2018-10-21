import { Component, OnInit } from '@angular/core';
import { User } from "./../../data/user";
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.user = this.authService.getAuthUser();
  }

  editProfile(){
    console.log("sldfj")
  }
}
