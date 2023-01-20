import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAndUpdatePassangerDto } from './models/CreateAndUpdatePassangerDto';
import { Passanger } from './models/passanger.model';

@Injectable({
  providedIn: 'root'
})
export class PassangerService {
  private readonly BASE_URL : string = 'http://localhost:8080/passangers'
  constructor(private httpClient : HttpClient) { }

  create(dto : CreateAndUpdatePassangerDto) : Observable <void> {
    return this.httpClient.post<void>(this.BASE_URL,dto)
  }

  get():Observable <Passanger[]>{
    return this.httpClient.get<Passanger[]>(this.BASE_URL);
  }

  delete(id : string ) : Observable <void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }

  edit(id : string, dto : CreateAndUpdatePassangerDto) : Observable<void>{
    return this.httpClient.patch<void>(`${this.BASE_URL}/${id}`,dto);
  }
  

}
