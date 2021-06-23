import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Router} from '@angular/router';
import { ROUTE_BASIC, ROUTE_DASHBOARD, ROUTE_NEW_USER, ROUTE_DATA_VIEW, ROUTE_USER_RIGHTS } from 'src/shared/constants/constant';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {
  dashboardurl = "";
  partyurl = "";
  ownerurl = "";
  driverurl = "";
  addddrurl = "";
  viewddrurl = "";
  addwalkingurl = "";
  generatebillurl = "";
  loggedin : any;
  pagerefresh : any;
  reportto: string;
  userrole: string;
  matadorurl: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    debugger;
    this.loggedin = JSON.parse(localStorage.getItem('loggedin'));
    this.pagerefresh = JSON.parse(localStorage.getItem('pagerefresh'));
    this.dashboardurl = "/" + ROUTE_DASHBOARD;
    this.ownerurl = "/" + ROUTE_DATA_VIEW;
    this.userrole = localStorage.getItem("loggedinuser");
    if(!this.loggedin)
    {
      this.router.navigateByUrl('/' + ROUTE_BASIC);
    }
  }
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  createuser(){
    this.router.navigateByUrl('/' + ROUTE_NEW_USER);
  }
  userrights(){
    this.router.navigateByUrl('/' + ROUTE_USER_RIGHTS);
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl('/' + ROUTE_BASIC);
  }
}
