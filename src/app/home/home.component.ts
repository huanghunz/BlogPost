import { Component, OnInit } from '@angular/core';
import { CONFIG } from './../config/config'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  getDocLink(){
    return CONFIG.DOCUMENT_URL;
  }

}
