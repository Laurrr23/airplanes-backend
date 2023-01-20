import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditAirplaneComponent } from '../create-edit-airplane/create-edit-airplane.component';
import { Planes } from '../models/plane.model';
import { PlaneService } from '../plane.service';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css']
})
export class AirplanesComponent implements OnInit {
 allPlanes : Planes[]= [] ;
 
  constructor(private PlaneService : PlaneService , private modalService : NgbModal) { }

  ngOnInit(): void {
    this.initializeData();
  }
  private initializeData(){
    this.PlaneService.get().subscribe(response=> this.allPlanes = response)
  }
  openCreateModal(){
    const modalRef = this.modalService.open(CreateEditAirplaneComponent)
    modalRef.result.then(()=>this.initializeData(),
    ()=>console.log('Ignored'))
  }
  onRemove(id : string){
    this.PlaneService.delete(id).subscribe(()=>this.initializeData());
  }
  onEdit(plane : Planes): void {  
    const modalRef = this.modalService.open(CreateEditAirplaneComponent)
    modalRef.componentInstance.existingPlane = plane;
    modalRef.result.then((response)=>this.initializeData(),()=>console.log('Ignored'))

  }

}
