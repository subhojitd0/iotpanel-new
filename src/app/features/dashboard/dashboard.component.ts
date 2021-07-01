import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_ADD } from 'src/shared/constants/constant';
import {  } from 'src/shared/services/api.url-helper';
import { ApiService } from 'src/shared/services/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pagerefrsh: any;
  isAdmin: string;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.pagerefrsh = JSON.parse(localStorage.getItem('pagerefresh'));
    this.isAdmin = localStorage.getItem("isAdmin");
    if(this.isAdmin == "1"){
      if(this.pagerefrsh == "0"){
        localStorage.setItem('pagerefresh', "1");
        this.router.navigateByUrl('/' + ROUTE_DATA_ADD);
      }
    }
    else{
      var json = 
      {
        "mode": 0
      };
      localStorage.setItem('selectedduty', "0");
      if(this.pagerefrsh == "0"){
        localStorage.setItem('pagerefresh', "1");
        location.reload();
      }
    }
    
  }

}
