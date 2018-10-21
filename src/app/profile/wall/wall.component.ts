import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public jokes;
  id: number;

  constructor(private userService: UserService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      this.id = +params['id']; // '+' convert it to an int
    });

    this.getUserWall();
  }

  getUserWall(){
    this.userService.getUserWall(this.id)
                     .then( res =>{
                       this.jokes = res.data;
                       console.log("res wall, ", res);
                     });
  }

}
