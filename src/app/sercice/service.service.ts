import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

testData:any = []
  constructor(private http: HttpClient) { }



// -----------------Start - Sub Admin API ------------------------
addTodoList(add:any){
  return this.http.post('https://fec79c4d.us-south.apigw.appdomain.cloud/api/entriess', add)

}

getTodoList(){
  return this.http.get('https://fec79c4d.us-south.apigw.appdomain.cloud/api/entries')
}

updateTodoList(update:any){
  return this.http.post('https://fec79c4d.us-south.apigw.appdomain.cloud/api/update',update)
}

deleteTOdoList(deleteData:any){
  return this.http.post('https://fec79c4d.us-south.apigw.appdomain.cloud/api/entries/delete',deleteData) 
}

}
