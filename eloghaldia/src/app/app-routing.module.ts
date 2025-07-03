import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { Landing2Component } from './components/landing2/landing2.component';
import { EquipmentComponent } from './components/equipment/equipment.component';

const routes: Routes = [
  { path: '', component:Landing2Component,pathMatch: 'full',canActivate:[MsalGuard] },
  {path:'equipment',component:EquipmentComponent,canActivate:[MsalGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
