
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertybase } from 'src/model/IPropertybase';
import { IProperty } from './IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<IPropertybase>;
  sellRent : number = 1;
  constructor(private housingService: HousingService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.url.toString()){
      this.sellRent = 2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe(
      response=>
      {
        this.properties = response;
      }, error=> {
        console.log(error)
      }
    );
  }

}
