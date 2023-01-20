import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAndUpdatePlaneDto } from '../models/CreateAndUpdatePlaneDto';
import { PlaneService } from '../plane.service';



@Component({
  selector: 'app-create-edit-airplane',
  templateUrl: './create-edit-airplane.component.html',
  styleUrls: ['./create-edit-airplane.component.css']
})
export class CreateEditAirplaneComponent implements OnInit {
@Input() existingPlane : any;
    createAndUpdateAirplaneGroup : FormGroup = new FormGroup<any>({
      departureControl : new FormControl('',[Validators.required]),
      destinationControl : new FormControl ('',[Validators.required]),
      noOfSeatsControl : new FormControl('',[Validators.required,Validators.min(0),Validators.max(150)]),
      priceControl : new FormControl ('',[Validators.required,Validators.min(0)])
    })

  constructor(private activeModal : NgbActiveModal, private airplaneService : PlaneService) { }

  ngOnInit( ): void {
    if(this.existingPlane){
      this.createAndUpdateAirplaneGroup.controls['departureControl'].patchValue(this.existingPlane.departure)
      this.createAndUpdateAirplaneGroup.controls['destinationControl'].patchValue(this.existingPlane.destination)
      this.createAndUpdateAirplaneGroup.controls['noOfSeatsControl'].patchValue(this.existingPlane.noOfSeats)
      this.createAndUpdateAirplaneGroup.controls['priceControl'].patchValue(this.existingPlane.price)


    }

  }
  dissmisModal(){
    this.activeModal.dismiss();
  }
  onSubbmit(){
    if(!this.createAndUpdateAirplaneGroup.valid){
      return;
    }
    if(this.existingPlane){
      this.edit();
    }else{
      this.create( )
    }
  }
  private edit() : void{
    const updateAirplaneDto : CreateAndUpdatePlaneDto ={
      departure : this.createAndUpdateAirplaneGroup.value.departureControl,
      destination : this.createAndUpdateAirplaneGroup.value.destinationControl,
      noOfSeats : this.createAndUpdateAirplaneGroup.value.noOfSeatsControl,
      price : this.createAndUpdateAirplaneGroup.value.priceControl
    }
    this.airplaneService.edit(this.existingPlane.id,updateAirplaneDto).subscribe(()=>this.activeModal.close())

  } 
  private create() : void {console.log(this.createAndUpdateAirplaneGroup);
  const dto : CreateAndUpdatePlaneDto = {
    departure : this.createAndUpdateAirplaneGroup.value.departureControl,
    destination : this.createAndUpdateAirplaneGroup.value.destinationControl,
    noOfSeats : this.createAndUpdateAirplaneGroup.value.noOfSeatsControl,
    price : this.createAndUpdateAirplaneGroup.value.priceControl
  }
  this.airplaneService.create(dto).subscribe(()=>this.activeModal.close())
  }

}
