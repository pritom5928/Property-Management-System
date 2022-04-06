import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private alertifyService : AlertifyService, private router : Router) { }

  loggedInUserName:string;
  ngOnInit() {

  }

  loggedIn(){
    this.loggedInUserName = localStorage.getItem("token");
    return this.loggedInUserName;
  }
  onLogout(){
    localStorage.removeItem("token");
    this.alertifyService.success("Log out successfully!!!");
    this.router.navigate(['/user/login']);
  }

}
