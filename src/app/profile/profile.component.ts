import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { UserService } from '../services/user.service';
import { User } from '../data/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  user: User;
  
  constructor(private router: ActivatedRoute,
             private userService: UserService,
             private authService: AuthService) { }

  ngOnInit() {
    //access the data
    this.router.params.subscribe((params)=>{
      //console.log("p: ",  params);
      this.id = +params['id']; // '+' convert it to an int
    })


      this.userService.getUserById(this.id)
                      .then((user)=>{
                        this.user = user;
                      })

  }

  isAuthUserProfile(): Boolean{
    return +this.id == +this.authService.getAuthUserId();
  }

}
