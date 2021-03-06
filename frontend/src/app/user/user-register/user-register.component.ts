import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  isFormSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserServiceService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup(
    // {
    //   userName : new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)] ),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(15)])
    // },  this.passwordMatchingValidator)

    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName : [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword : [null, [Validators.required, Validators.minLength(8)]],
      mobile: [null, [Validators.required, Validators.maxLength(15)]]
    }, {Validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup) : Validators{

    return fg.get("password").value === fg.get("confirmPassword").value ? null : { notMatched: true};
  }


  //getter method for all form fieldsks
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  userdata() : User{
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }

  onSubmit(){
    this.isFormSubmitted = true;
     if(this.registrationForm.valid){
      //  this.user = Object.assign(this.user, this.registrationForm.value);
       this.userService.adduser(this.userdata());
       this.registrationForm.reset();
       this.isFormSubmitted = false;
       this.alertifyService.success("Successfully registered user!!!");
     }
     else{
      this.alertifyService.error("Please provide all the required information");
     }
   }


}


