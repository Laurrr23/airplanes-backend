import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditAirplaneComponent } from './create-edit-airplane/create-edit-airplane.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassangerListComponent } from './passanger-list/passanger-list.component';
import { CreateEditPassangerComponent } from './create-edit-passanger/create-edit-passanger.component';

@NgModule({
  declarations: [
    AppComponent,
    AirplanesComponent,
    CreateEditAirplaneComponent,
    PassangerListComponent,
    CreateEditPassangerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
