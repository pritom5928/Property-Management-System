import { Component, Input } from "@angular/core";
import { IPropertybase } from "src/model/IPropertybase";
import { IProperty } from "../property-list/IProperty.interface";

@Component({
  selector: 'app-property-card',
  templateUrl : 'property-card.component.html',
  styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent{

@Input() property: IPropertybase;
@Input() isHideIcon: boolean;


}
