import { Injectable, EventEmitter } from "@angular/core";
import { Message} from './../data/message'; // todo


@Injectable()
export class NotifyService{

    // <Message> --> our message is gonna have a specific structure
    public newMessageReceived: EventEmitter<Message>

    constructor(){
        this.newMessageReceived = new EventEmitter();
    }

    // this is gonna emit an event and activate element to the html to show notification
    nofity(message: string, type: string){
        let newMessage = new Message(message, type);
        this.newMessageReceived.emit(newMessage);
    }
}