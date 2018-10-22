import { Component, OnInit } from '@angular/core';

// FormGroup : group of form control
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { JokeService } from '../services/joke.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {
  
  public jokeForm : FormGroup

  constructor(
          private fb: FormBuilder,
          private jokeService: JokeService,
          private router: Router,
          private authService: AuthService
        ) { 
          this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    // generate form control inside of the group
    this.jokeForm = this.fb.group({
      title:['',
      [
        Validators.required,
        Validators.minLength(5)
      ]
      ], // new FormControl underneath
      content:['',
      [
        Validators.required,
        Validators.minLength(5)
      ]]
      // address: this.fb.group({
      //   state: '',
      //   postcode: 0
      // })

    });

  }

  onSubmit(){
    
    this.jokeService.createJoke(this.jokeForm.value)
                    .then( res=>{
                      this.router.navigate(
                        ['/user/profile', this.authService.getAuthUserId()])
                    })
  }
}
