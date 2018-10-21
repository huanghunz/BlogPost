

import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config'

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
//import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './../data/userData'
import { User } from '../data/user'
import {Router} from "@angular/router"
import { NotifyService } from "./notify.service";

import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';


const HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService{
    
    private progressRef: NgProgressRef;

    constructor(private http: HttpClient,
                private router: Router,
                private notifyService: NotifyService,
                private ngProgress: NgProgress){

                    this.progressRef = this.ngProgress.ref();
                    
                    console.log("ngon init: ", this.progressRef);
    }


    ngOnDestroy() {
        // Destroy the progress bar ref
        this.progressRef.destroy();
    }

    register(name: string, email: string, password: string)
    :Promise<UserData>
    {
        const registerURL = `${CONFIG.API_URL}/register`;
        
        return this.http.post<UserData>(registerURL,{name, email, password}, HTTP_OPTIONS)
                    .toPromise()
                    .then(res =>{
                        return new UserData(res.token, res.user);
                    });
    }

    logUserIn(userData: UserData): void{
        localStorage.setItem('jokerAppToken', userData.token);
        localStorage.setItem('jokerAppUser', JSON.stringify(userData.user));

        this.notifyService.nofity("Login Succeed!", 'success');
        this.router.navigate(['/dashboard']);
    }

    login(email: string, password: string)
    :Promise<UserData>
    {
        this.progressRef.start();

        const authenticateURL = `${CONFIG.API_URL}/authenticate`;
        return this.http.post<UserData>(authenticateURL,{ email: email, password: password}, HTTP_OPTIONS)
            .toPromise()
            .then(res =>{
                this.progressRef.complete();
                return new UserData(res.token, res.user);
            })
    }

    isLoggedIn():Boolean{
        let token = localStorage.getItem('jokerAppToken');
        let user = localStorage.getItem('jokerAppUser');
        
        if (user && token) return true;
        return false;
    }

    logout(){
        localStorage.removeItem('jokerAppToken');
        localStorage.removeItem('jokerAppUser');
        this.router.navigate(['/auth/login'])
    }

    getAuthUser(): User{
        return JSON.parse(localStorage.getItem('jokerAppUser'));
    }

    getAuthUserId():number{
        return JSON.parse(localStorage.getItem('jokerAppUser')).id;
    }

    getToken(): string {
        return localStorage.getItem('jokerAppToken');
    }

}