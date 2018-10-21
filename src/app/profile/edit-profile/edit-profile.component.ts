import { Component, OnInit } from '@angular/core';
import { User } from "./../../data/user";
import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService,
             private userService: UserService,
             private notifyService: NotifyService) { }

  ngOnInit() {

    this.user = this.authService.getAuthUser();
  }

  editProfile(){
   // this.authService
   this.userService.updateProfile(this.user.name, this.user.email)
                   .then((user)=>{
                     this.user = user;
                     
                     this.notifyService.nofity("Profile updated!", 'success')
                   })
  }
}
