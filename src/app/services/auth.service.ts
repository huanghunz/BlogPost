
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
        console.log("auth service register: ", name, " ", email, " ", password);

        // return Observable.create((observer: Observer<UserData>) => {
        //     this.http.post<UserData>(apiURL,{name, email, password},  httpOptions)
        //       .subscribe( (res:Response) => {
        //           // Do my service.ts logic.
        //           // ...
        //           let token = res.json().token;
        //                  let user = res.json().user;//.data;
        //                 // console.log("!!!", res, " ", res.user, ", t: " , res.token);
        //                  let userData = new UserData(token, user);
        //                  return userData;
        //       }, err => observer.error(err))
        // })

        // return Observable.create((observer: Observer<UserData>) => {
        //     this.http.post<UserData>(apiURL,{name, email, password},  httpOptions)
        //       .subscribe( (res) => {
        //           // Do my service.ts logic.
        //           // ...
        //           let token = res.token;
        //                  let user = res.user;//.data;
        //                 // console.log("!!!", res, " ", res.user, ", t: " , res.token);
        //                  let userData = new UserData(token, user);
        //                  return userData;
        //       }, err => observer.error(err))
        // })}
        
        return this.http.post<UserData>(apiURL,{name, email, password},  httpOptions)
        .toPromise()
        .then(res =>{
            let token = res.token;
             let user = res.user;
             console.log("res?? ", res);
               let u = new UserData(token, user);
               return u;
          });
        
    }



    LogUserIn(userData: UserData): void{
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        this.router.navigate(['/dashboard']);
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(`AuthService: ${message}`)
        // this.messageService.add(`HeroService: ${message}`);
    }
}