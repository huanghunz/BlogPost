
//Reactive Extensions for JavaScript is a library for transforming,
//composing, and querying streams of data
//import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config'

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Observer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './../userData/userData'
import { User } from './../userData/user/user'
import {Router} from "@angular/router"

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService{

    public response:Observable<any>;

    constructor(private http: HttpClient,
                private router: Router){
        
    }

    register(name: string, email: string, password: string)
    :Promise<UserData>
    {
        let apiURL = `${CONFIG.API_URL}register`;
        
        return this.http.post<UserData>(apiURL,{name, email, password},  httpOptions)
        .toPromise()
        .then(res =>{
            console.log(typeof(res));
            return new UserData(res.token, res.user);
          });
    }

    LogUserIn(userData: UserData): void{
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        this.router.navigate(['/dashboard']);
    }
}