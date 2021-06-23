import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../../shared/services/service';
import { ToastrService } from 'ngx-toastr';
import {LOGIN_API} from '../../../shared/services/api.url-helper';
import { ROUTE_BASIC, ROUTE_DASHBOARD } from 'src/shared/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  constructor(private router: Router,private apiService: ApiService, private toastr: ToastrService) {
    debugger;
    let isLoggedIn = localStorage.getItem('loggedin'); 
    if(isLoggedIn && isLoggedIn == "1"){
      this.router.navigateByUrl('/' + ROUTE_DASHBOARD);
    }
  }

  ngOnInit(): void {
    debugger;
    localStorage.setItem('pagerefresh', "0");
  }

  login(){
    debugger;
    
    this.toastr.info("Please wait while we validate your credentials",'Information');
    var json = 
    {
      "username":this.username,
      "password":this.password,
      "mode": "5"
    };
    this.apiService.post(LOGIN_API, json).then((res: any)=>{ 
      if(res.hasOwnProperty('error')){
        this.toastr.error("You have entered wrong credentials",'Error');
      }
      else{
        /* if(res.hasOwnProperty('username')){
          localStorage.setItem("userrole", "");
          localStorage.setItem("approve", res.approve);
					localStorage.setItem("delete", res.delete);
					localStorage.setItem("createbill", res.createbill);
					localStorage.setItem("enterddr", res.enterddr);
					localStorage.setItem("enterowner", res.enterowner);
					localStorage.setItem("enterparty", res.enterparty);
					localStorage.setItem("payowner", res.payowner);
          this.toastr.success("Login Successful! Welcome " + res.username,'Success');
          localStorage.setItem('loggedinuser', res.username);
          this.router.navigateByUrl('/' + ROUTE_BASIC); 
        } */
        localStorage.setItem("loggedinusername", this.username);
        localStorage.setItem('loggedin', "1");
        window.location.reload();
      }
    });
  }
}
