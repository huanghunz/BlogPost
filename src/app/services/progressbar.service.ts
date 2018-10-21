
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService{
    
    private progressBarRef: NgProgressRef;

    constructor(private ngProgress: NgProgress){
        this.progressBarRef = this.ngProgress.ref();
    }

    start(){
        this.progressBarRef.start();
    }

    complete(){
        this.progressBarRef.complete();
    }
}