import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertybase } from 'src/model/IPropertybase';
import { Property } from 'src/model/Property';
import { IProperty } from '../property/property-list/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) {


  }

  getAllProperties(sellRent: Number) : Observable<IPropertybase[]>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<IPropertybase> = [];

        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].sellrent === sellRent){
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
      )
  }


  addProperty(property: Property){
    localStorage.setItem("newProp", JSON.stringify(property));
  }
}
