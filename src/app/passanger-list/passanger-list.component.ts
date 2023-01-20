import { Component, OnInit } from '@angular/core';
import { Passanger } from '../models/passanger.model';
import { PassangerService } from '../passanger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditPassangerComponent } from '../create-edit-passanger/create-edit-passanger.component';
import { identifierName } from '@angular/compiler';
import { PlaneService } from '../plane.service';
import { Planes } from '../models/plane.model';
import { __values } from 'tslib';
@Component({
  selector: 'app-passanger-list',
  templateUrl: './passanger-list.component.html',
  styleUrls: ['./passanger-list.component.css']
})
export class PassangerListComponent implements OnInit {
  allPassangers : Passanger[] = [];
  allPlanes  : Planes[] = [];
  constructor(private passangerService : PassangerService, private modalService : NgbModal, private planeService : PlaneService) { }

  ngOnInit(): void {
    this.initializaData();
    this.planeService.get().subscribe(response => this.allPlanes = response)
  }

  private initializaData(){
    this.passangerService.get().subscribe(response => this.allPassangers = response)
  }

  openCreateModal(){
    const modalRef = this.modalService.open(CreateEditPassangerComponent)
    modalRef.result.then(()=>this.initializaData(),()=>console.log('Ignored'))
  }
  onRemove(id : string){
    this.passangerService.delete(id).subscribe(()=>this.initializaData())
  }
  onEdit(passanger : Passanger) : void{
    const modalRef = this.modalService.open(CreateEditPassangerComponent)
    modalRef.componentInstance.existingPassanger = passanger;
    modalRef.result.then((result) => this.initializaData(),()=>console.log('ignored'))

  }

  findPlaneInfo(planeId : string) : string{
    const plane = this.allPlanes.find( value => value.id === planeId);

    return `${plane?.departure} - ${plane?.destination}`;


  }
}
