import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { FormControl, Validators } from '@angular/forms' 
import { JokeService } from '../services/joke.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  @Input() editable: Boolean = true;
  @Input() joke;
  @Output() jokeDelete = new EventEmitter();

  title: FormControl;
  content: FormControl;

  isEditing: Boolean = false;
  
  constructor(private authService: AuthService,
              private jokeService: JokeService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.title = new FormControl(this.joke.title, [Validators.required, Validators.minLength(5)]);
    this.content = new FormControl(this.joke.joke, [Validators.required, Validators.minLength(5)]);
  }

  canModify():Boolean{
    return this.joke.user.id == this.authService.getAuthUserId()
  }

  edit(){
    this.isEditing = true;
  }

  update(){
    this.jokeService.updateJoke(this.joke.id,{
      title: this.title.value, 
      content: this.content.value
    })
    .then(res=>{
      this.joke = res;
      this.isEditing = false;
      this.notifyService.nofity("Joke updated", 'success');

    })
  }

  cancel(){
    this.title.reset();
    this.content.reset();
    this.isEditing = false;
  }

  delete(){
    this.jokeService.deleteJoke(this.joke.id)
        .then(res=>{
        
          // tell the parent that it should update
          this.jokeDelete.emit(this.joke.id);
        });
  }
}
