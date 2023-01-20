import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAndUpdatePassangerDto } from '../models/CreateAndUpdatePassangerDto';
import { Planes } from '../models/plane.model';
import { PassangerService } from '../passanger.service';
import { PlaneService } from '../plane.service';

@Component({
  selector: 'app-create-edit-passanger',
  templateUrl: './create-edit-passanger.component.html',
  styleUrls: ['./create-edit-passanger.component.css']
})
export class CreateEditPassangerComponent implements OnInit {
@Input() existingPassanger: any;
allPlanes : Planes[] = [];
  createUpdatePassangerGroup : FormGroup = new FormGroup<any>({
    emailControl : new FormControl('',[Validators.required,Validators.email]),
    planeIdControl : new FormControl('',[Validators.required]),
    fullNameControl : new FormControl ('',[Validators.required,Validators.minLength(3)])
  })
  constructor(private activeModal : NgbActiveModal , private passangerService : PassangerService , private planeService : PlaneService) { }

  ngOnInit(): void {
    if (this.existingPassanger){
      this.createUpdatePassangerGroup.controls['emailControl'].patchValue(this.existingPassanger.email)
      this.createUpdatePassangerGroup.controls['planeIdControl'].patchValue(this.existingPassanger.planeId)
      this.createUpdatePassangerGroup.controls['fullNameControl'].patchValue(this.existingPassanger.fullName)
    }
    this.planeService.get().subscribe(response=>this.allPlanes = response);
  }
  dissmisModal(){
    this.activeModal.dismiss();
  }

  onSubbmit(){
    if(!this.createUpdatePassangerGroup.valid){
      return;
    }if(this.existingPassanger){
      this.edit();
    }else{
      this.create();
    }
  }
  private create() : void{console.log(this.createUpdatePassangerGroup)
  const dto : CreateAndUpdatePassangerDto = {
      email : this.createUpdatePassangerGroup.value.emailControl,
      planeId : this.createUpdatePassangerGroup.value.planeIdControl,
      fullName : this.createUpdatePassangerGroup.value.fullNameControl
  }
  this.passangerService.create(dto).subscribe(()=>this.activeModal.close())

}
 private edit() : void {
  const updatePssangerDto : CreateAndUpdatePassangerDto = {
    email : this.createUpdatePassangerGroup.value.emailControl,
    planeId : this.createUpdatePassangerGroup.value.planeIdControl,
    fullName : this.createUpdatePassangerGroup.value.fullNameControl
  }
  this.passangerService.edit(this.existingPassanger.id,updatePssangerDto).subscribe(()=>this.activeModal.close())
 }

}
