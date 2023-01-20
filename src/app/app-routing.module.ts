import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { PassangerListComponent } from './passanger-list/passanger-list.component';

const routes: Routes = [{path : 'airplanes/list',component : AirplanesComponent},{
                        path : 'passangers/list' , component : PassangerListComponent},
                      {path : '**' , component : AirplanesComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
