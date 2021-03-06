

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

        this.progressBarService.start();

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
                            this.progressBarService.complete();
                             return res;
                         });
    }

    getAllJokes(endPoints = null){

        this.progressBarService.start();

        let url;
        if (endPoints != null){
            url = endPoints;
        }
        else{
            url = `${CONFIG.API_URL}/jokes`;
        }
        let options = {
            headers: this.headers
        }

        return this.httpc.get<any>(url, options)
                .toPromise()
                .then(res =>{
                    if (endPoints != null){
                        this.progressBarService.complete();
                        return res;
                    }
                    else{

                        let lastPage 
                        = `${CONFIG.API_URL}/jokes?page=${res.last_page}`
                        
                        return this.getAllJokes(lastPage);
                    }
                });
    }

    updateJoke(id : number, joke){

        this.progressBarService.start();

        const url = `${CONFIG.API_URL}/jokes/${id}`

        let body = {
            title: joke.title, joke: joke.content
        }
        let options = {
            headers: this.headers
        }

        return this.httpc.put(url, body, options)
                         .toPromise()
                         .then(res =>{
                            this.progressBarService.complete();
                            return res;
                         });
    }

    deleteJoke(id : number){

        this.progressBarService.start();

        const url = `${CONFIG.API_URL}/jokes/${id}`

        let options = {
            headers: this.headers
        }

        return this.httpc.delete(url, options)
                         .toPromise()
                         .then(res =>{
                            this.progressBarService.complete();
                            return res;
                         });
    }
}