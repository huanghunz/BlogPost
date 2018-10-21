import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { Message } from '../data/message';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {


  message: Message;

  EMPTY_MESSAGE: Message = new Message("","");

  constructor(private notifyService: NotifyService) { 
    // listening to the event
    this.notifyService.newMessageReceived.subscribe(
      (message) =>{
        this.newMessageReceived(message);
      }
    );
  }

  ngOnInit() {

  }

  newMessageReceived(message: Message){
    this.message = message;

    // after 2 seconds clear the message
    setTimeout(()=>{
      this.message = this.EMPTY_MESSAGE;
    }, 2000)
  }

}
