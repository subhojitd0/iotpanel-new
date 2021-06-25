import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Router} from '@angular/router';
import { ROUTE_BASIC, ROUTE_DASHBOARD, ROUTE_NEW_USER, ROUTE_DATA_VIEW, ROUTE_USER_RIGHTS } from 'src/shared/constants/constant';
import { SENSOR_API } from 'src/shared/services/api.url-helper';
import { ApiService } from 'src/shared/services/service';

class Sensor{
  sensor: string;
}
class Hub{
  hub: string;
  sensors: Sensor[] = [];
}
class Zone{
  zone: string;
  hubs: Hub[] = [];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  loggedin : any;
  pagerefresh : any;
  reportto: string;
  userrole: string;
  zones: any[] =[];
  hubs: any[] =[];
  sensors: any[] =[];
  loading: boolean;
  user: string;
  selectedzone: string;
  step = 0;

  isExpanded = true;
  showZoneMenu: boolean[] = [];
  showHubmenu: boolean[] = [];
  showSensormenu: boolean[] = [];
  isShowing = true;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loggedin = JSON.parse(localStorage.getItem('loggedin'));
    this.pagerefresh = JSON.parse(localStorage.getItem('pagerefresh'));
    debugger;
    this.user = localStorage.getItem("loggedinusername");
    var json = 
    {
      "mode": 4,
      "username": this.user
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      res.forEach(element =>{
        let z = new Zone();
        z.zone = element.zone;
        var json = 
        {
          "mode": 5,
          "username": this.user,
          "zone": element.zone
        };
        this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
          //z.hubs = res;
          this.hubs = res;
          this.hubs.forEach(hub =>{
            var json = 
            {
              "mode": 6,
              "username": this.user,
              "hub": hub.hub,
              "zone": element.zone
            };
            let h = new Hub();
            h.hub = hub.hub;
            this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
              h.sensors = res;
              z.hubs.push(h);
            });
          });
          this.zones.push(z);
        });
      });
    });
  }
  openzone(name: any){
    this.showZoneMenu.forEach((elem: any) =>{
      if(elem === name){
        this.showZoneMenu[elem] = true;
      }
    });
  }
  openhub(name: any){
    this.showHubmenu.forEach((elem: any) =>{
      if(elem === name){
        this.showHubmenu[elem] = true;
      }
    });
  }
   getSensorDetail(index: any){

   }
  getHubs(index: any) {
    this.loading = true;
    
  }

  getSensors(index: any) {
    this.loading = true;
    
  }

 

  close(){
    this.isExpanded = !this.isExpanded;
    this.isShowing = !this.isShowing;
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl('/' + ROUTE_BASIC);
  }
}
