

import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config'

import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './../data/userData'
import { User } from '../data/user'
import { NotifyService } from "./notify.service";
import { AuthService } from "./auth.service";
import { ProgressBarService } from "./progressbar.service";

@Injectable()
export class JokeService{
    
    private headers: HttpHeaders;

    constructor(private authService: AuthService,
        private httpc: HttpClient,
        private progressBarService: ProgressBarService) {
            const authorizationMsg = `Bearer ${this.authService.getToken()}`;
            this.headers = new HttpHeaders({
                'Authorization': authorizationMsg, 
            })
    }

    createJoke(joke):Promise<any>{
        const url = `${CONFIG.API_URL}/jokes`

        let body = {
            title: joke.title, joke: joke.content
        }
        let options = {
            headers: this.headers
        }

        return this.httpc.post(url, body, options)
                         .toPromise()
                         .then(res =>{
                             return res;
                         });
    }
}