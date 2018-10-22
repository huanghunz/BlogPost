

import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config'

import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './../data/userData'
import { User } from '../data/user'
import {Router} from "@angular/router"
import { NotifyService } from "./notify.service";
import { ProgressBarService } from "./progressbar.service";



const HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService{

    constructor(private http: HttpClient,
                private router: Router,
                private notifyService: NotifyService,
                private progressBarService: ProgressBarService){

    }
    

    register(name: string, email: string, password: string)
    :Promise<UserData>
    {
        const registerURL = `${CONFIG.API_URL}/register`;
        
        return this.http.post<UserData>(registerURL,{name, email, password}, HTTP_OPTIONS)
                    .toPromise()
                    .then(res =>{
                        return new UserData(res.token, res.user);
                    })
                    .catch( e =>{
                        this.progressBarService.complete();
        console.log(e.error.error);
                        let msg = e.error.error;
                        if (e.error.error == "invalid_credentials"){
                            msg = "Invalid email or password";
                        }
                        this.notifyService.nofity(msg, 'error');
                        return Promise.reject(e)
                    })
    }

    logUserIn(userData: UserData): void{
        localStorage.setItem(CONFIG.TOKEN, userData.token);
        localStorage.setItem(CONFIG.USER, JSON.stringify(userData.user));

        this.notifyService.nofity("Login Succeed!", 'success');
        this.router.navigate(['/dashboard']);
    }

    login(email: string, password: string):Promise<any>
    {
        this.progressBarService.start();

        const authenticateURL = `${CONFIG.API_URL}/authenticate`;
        return this.http.post<UserData>(authenticateURL,{ email: email, password: password}, HTTP_OPTIONS)
            .toPromise()
            .then(res =>{
                this.progressBarService.complete();
                return res as UserData;
            })
            .catch( e =>{
                this.progressBarService.complete();

                let msg = e.error.error;
                if (e.error.error == "invalid_credentials"){
                    msg = "Invalid email or password";
                }
                this.notifyService.nofity(msg, 'error');
                return Promise.reject(e)
            })
    }

    isLoggedIn():Boolean{
        let token = localStorage.getItem(CONFIG.TOKEN);
        let user = localStorage.getItem(CONFIG.USER);
        
        if (user && token) return true;
        return false;
    }

    logout(){
        localStorage.removeItem(CONFIG.TOKEN);
        localStorage.removeItem(CONFIG.USER);
        this.router.navigate(['/auth/login'])
    }

    getAuthUser(): User{
        let item = localStorage.getItem(CONFIG.USER);
        if (item == null){
            return null
        }
        return JSON.parse(localStorage.getItem(CONFIG.USER)).data as User;
    }

    getAuthUserId():number{
        return +JSON.parse(localStorage.getItem(CONFIG.USER)).data.id;
    }

    getToken(): string {
        return localStorage.getItem(CONFIG.TOKEN);
    }

}