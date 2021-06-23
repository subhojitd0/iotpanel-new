import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTE_BASIC, ROUTE_DASHBOARD, ROUTE_NEW_USER, ROUTE_PARTY, ROUTE_USER_RIGHTS } from 'src/shared/constants/constant';
import { UserComponent } from './features/create-user/user.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { PartyComponent } from './features/data-view/data-view.component';
import { UserRightComponent } from './features/user-rights/user-right.component';

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
    path: ROUTE_PARTY,
    component:PartyComponent
  },
  {
    path: ROUTE_NEW_USER,
    component:UserComponent
  },
  {
    path: ROUTE_USER_RIGHTS,
    component:UserRightComponent
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent]