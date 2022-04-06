import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  onLogin(loginForm: NgForm){
    const user = this.authService.authUser(loginForm.value);
    if(user){

      console.log("Login successful");
    }
    else{

      console.log("Login not successful");
    }
  }
}
