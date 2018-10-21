import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  data;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {

    this.getJokes();
  }

  getJokes(endPoints = null){
    this.jokeService.getAllJokes(endPoints)
                    .then(res=>{
                      this.data = res;
                      this.data.data = this.data.data.reverse();
                      console.log(this.data);
                    })
  }

  getNextJokes(){
    this.getJokes(this.data.next_page_url);
  }

  getPrevJokes(){
    this.getJokes(this.data.prev_page_url);
  }

  //todo: go to page

}
