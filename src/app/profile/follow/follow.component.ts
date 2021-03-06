import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnChanges {
 
  // getting data from the parent
  @Input() currentProfileId

  public isFollowing: Boolean
  private isLoading: Boolean = true; // isFollowing loading state

  constructor(private followService: FollowService) { }

  ngOnInit() {
   this.checkIfFollowing();
  }

  ngOnChanges(changes): void {
    this.checkIfFollowing();
  }

  checkIfFollowing(){
    this.followService.isFollowing(this.currentProfileId)
    .then( res=>{
      
      this.isFollowing = res;
      this.isLoading = false;
    })
  }


  follow(){
    this.followService.follow(this.currentProfileId)
                      .then( res =>{
                        this.isFollowing = true;
                      })
  }

  unfollow(){
    this.followService.unfollow(this.currentProfileId)
                      .then( res =>{
                        this.isFollowing = false;
                      })
  }
}
