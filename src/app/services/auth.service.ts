

import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config'

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Observer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './../data/userData'
import { User } from '../data/user'
import {Router} from "@angular/router"
import { NotifyService } from "./notify.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService{

    public response:Observable<any>;

    constructor(private http: HttpClient,
                private router: Router,
                private notifyService: NotifyService){
    }

    register(name: string, email: string, password: string)
    :Promise<UserData>
    {
        const registerURL = `${CONFIG.API_URL}register`;
        
        return this.http.post<UserData>(registerURL,{name, email, password}, httpOptions)
        .toPromise()
        .then(res =>{
            return new UserData(res.token, res.user);
          });
    }

    logUserIn(userData: UserData): void{
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        this.notifyService.nofity("Login Succeed!", 'success');
        this.router.navigate(['/dashboard']);
    }

    login(email: string, password: string)
    :Promise<UserData>
    {
        const authenticateURL = `${CONFIG.API_URL}authenticate`;
        return this.http.post<UserData>(authenticateURL,{ email: email, password: password}, httpOptions)
            .toPromise()
            .then(res =>{
                return new UserData(res.token, res.user);
            })
    }

    isLoggedIn():Boolean{
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (user && token) return true;
        return false;
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login'])
    }
}