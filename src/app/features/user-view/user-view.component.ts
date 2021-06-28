import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD } from 'src/shared/constants/constant';
import { SENSOR_API } from 'src/shared/services/api.url-helper';
import { User } from '../create-user/user.component';

export interface UserTable {
  username: string;
  hub: string;
  sensor1: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
  sensor5: string;
  sensor6: string;
}

export class UserTable {
  username: string;
  hub: string;
  sensor1: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
  sensor5: string;
  sensor6: string;
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  allData: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['username', 'hub', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6'];
  dataSource: MatTableDataSource<UserTable>;
  constructor(private router: Router,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    /* const party: PartyHead[] =[
      {position: 1, name: 'Hydrogen', rate: "Package", option: 'H'},
      {position: 2, name: 'Helium', rate: "Package", option: 'He'},
      {position: 3, name: 'Lithium', rate: "Package", option: 'Li'},
      {position: 4, name: 'Beryllium', rate: "-", option: 'Be'},
      {position: 5, name: 'Boron', rate: "Package", option: 'B'},
      {position: 6, name: 'Carbon', rate: "-", option: 'C'},
      {position: 7, name: 'Nitrogen', rate: "Package", option: 'N'},
      {position: 8, name: 'Oxygen', rate: "Slab", option: 'O'},
      {position: 9, name: 'Fluorine', rate: "Slab", option: 'F'},
      {position: 10, name: 'Neon', rate: "Package", option: 'Ne'},
    ];
    this.dataSource = new MatTableDataSource(party); */
   }
   ngOnInit() : void {
    var json = 
    {
      "mode": 4,
      "username": "IOT-ALL-USER"
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      debugger;
      this.allData = res;
      this.setupdata();
    });
   }
   setupdata(){
    let userData: UserTable[] = []; 
    let uniqueUsers = [...new Set(this.allData.map(x=>x.username))];
    uniqueUsers.forEach((user: any)=>{
        let distinctHubs = [...new Set(this.allData.filter(x=>x.username === user).map(y=>y.hub))];
        if(distinctHubs.length > 0){
            distinctHubs.forEach((hub: any)=>{
                let eachUserData: UserTable = new UserTable();
                eachUserData.username = user;
                eachUserData.hub = hub;
                let sensorRows = [...new Set(this.allData.filter(x=>x.username === user && x.hub === hub).map(y=>y.sensor))];
                let count = 0;
                sensorRows.forEach(sensor =>{
                    if(count === 0){
                        eachUserData.sensor1 = sensor;
                    }
                    if(count === 1){
                        eachUserData.sensor2 = sensor;
                    }
                    if(count === 2){
                        eachUserData.sensor3 = sensor;
                    }
                    if(count === 3){
                        eachUserData.sensor4 = sensor;
                    }
                    if(count === 4){
                        eachUserData.sensor5 = sensor;
                    }
                    if(count === 5){
                        eachUserData.sensor6 = sensor;
                    }
                    count = count + 1;
                });
                userData.push(eachUserData);
            });
        }
        else{
            let eachUserData: UserTable;
            eachUserData.username = user;
            userData.push(eachUserData);
        }
    });
    this.dataSource = new MatTableDataSource(userData);
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /* openEditSensorDialog(id: any) {
    const dialogRef = this.dialog.open(GenerateOTComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  } */
  /* openAddHubDialog(id: any) {
    localStorage.setItem('selecteddriverid', id);
    const dialogRef = this.dialog.open(AddDriverComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  } */
  /* deleteDriver(id: any){
    var r = confirm("Are you sure that you want to delete this record ?");
    if (r == true) {
      debugger;
      var json = 
      {
        "mode":3,
        "drivercode": id
      }
      this.apiService.post(DRIVER_API, json).then((res: any)=>{ 
        this.toastr.success("Your data was successfully saved",'Success');
        location.reload();
      });
    }
  } */
}
