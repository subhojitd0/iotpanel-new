import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_BASIC, ROUTE_DASHBOARD, ROUTE_NEW_USER, ROUTE_DATA_VIEW, ROUTE_USER_RIGHTS, ROUTE_DATA_ADD, ROUTE_REPORT, ROUTE_DASHBOARD_1, ROUTE_SWITCH } from 'src/shared/constants/constant';
import { UserComponent } from './features/create-user/user.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { DataViewComponent } from './features/data-view/data-view.component';
import { UserRightComponent } from './features/user-rights/user-right.component';
import { DataAddComponent } from './features/data-add/data-add.component';
import { UserViewComponent } from './features/user-view/user-view.component';
import { ReportComponent } from './features/report/report.component';
import { Dashboard1Component } from './features/dashoard-1/dashboard.component';
import { SwitchComponent } from './features/switch/dashboard.component';

const routes: Routes = [
  {
    path: ROUTE_BASIC,
    component:LoginComponent
  },
  {
    path: ROUTE_DASHBOARD,
    component:DashboardComponent
  },
  {
    path: ROUTE_DASHBOARD_1,
    component:Dashboard1Component
  },
  {
    path: ROUTE_DATA_VIEW,
    component:DataViewComponent
  },
  {
    path: ROUTE_NEW_USER,
    component:UserComponent
  },
  {
    path: ROUTE_USER_RIGHTS,
    component:UserRightComponent
  },
  {
    path: ROUTE_DATA_ADD,
    component: UserViewComponent
  },
  {
    path: ROUTE_REPORT,
    component: ReportComponent
  },
  {
    path: ROUTE_SWITCH,
    component: SwitchComponent
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent]