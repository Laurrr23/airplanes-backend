import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAndUpdatePlaneDto } from './models/CreateAndUpdatePlaneDto';
import { Planes } from './models/plane.model';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
private readonly BASE_URL : string = 'http://localhost:8080/airplanes'
  constructor(private httpClient : HttpClient) { }
  create(dto : CreateAndUpdatePlaneDto) : Observable<void>{
    return this.httpClient.post<void>(this.BASE_URL,dto);
  }
  get():Observable<Planes[]>{
    return this.httpClient.get<Planes[]>(this.BASE_URL);
  }
  delete(id : string):Observable<void>{
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`)

  }

  edit(id:string, dto  : CreateAndUpdatePlaneDto) : Observable<void>{
    return this.httpClient.patch<void>(`${this.BASE_URL}/${id}`,dto);
  }
}
