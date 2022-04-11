import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertybase } from 'src/model/IPropertybase';
import { Property } from 'src/model/Property';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  BasicInfo: any;
  PriceInfo: any;
  AddressInfo: any;
  OtherInfo: any;

  constructor(private router : Router, private fb : FormBuilder, private housingService : HousingService) { }
  // @ViewChild('Form') addPropertyForm : NgForm;
  @ViewChild('formTabs') staticTabs?: TabsetComponent;

  addPropertyForm: FormGroup;
  ///Varibales declaration
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  property = new Property();

  cityList: any;

  propertyView :IPropertybase = {
    id: null,
    name: null,
    sellrent: null,
    ptype: null,
    price: null,
    ftype: null,
    bhk: null,
    builtarea: null,
    city: '',
    rtm: null
  };

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data => {
      debugger;
      this.cityList = data;
      console.log(data);
    });
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({

      BasicInfo: this.fb.group({
        sellrent: ['1' , Validators.required],
        bhk: [null, Validators.required],
        ptype: [null, Validators.required],
        ftype: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        price: [null, Validators.required],
        builtarea: [null, Validators.required],
        carpetarea: [null],
        security: [null],
        maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        floorno: [null],
        totalfloor: [null],
        address: [null, Validators.required],
        landmark: [null],
      }),

      OtherInfo: this.fb.group({
        rtm: [null, Validators.required],
        possessionon: [null],
        aop: [null],
        gated: [null],
        mainentrance: [null],
        description: [null]
      })

    });
  }

   // #region <FormGroups>
  //  get BasicInfo() {
  //   return this.addPropertyForm.controls.BasicInfo as FormGroup;
  // }

  // get PriceInfo() {
  //   return this.addPropertyForm.controls.PriceInfo as FormGroup;
  // }

  // get AddressInfo() {
  //   return this.addPropertyForm.controls.AddressInfo as FormGroup;
  // }

  // get OtherInfo() {
  //   return this.addPropertyForm.controls.OtherInfo as FormGroup;
  // }
// #endregion


  //#region map data to property object to save on db
  mapProperty(): void{
    this.property.sellrent = +this.sellrent.value;
    this.property.bhk = this.bhk.value;
    this.property.ptype = this.ptype.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.ftype = this.ftype.value;
    this.property.price = this.price.value;
    this.property.security = this.security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtarea = this.builtarea.value;
    this.property.carpetarea = this.carpetarea.value;
    this.property.floorno = this.floorno.value;
    this.property.totalfloor = this.totalfloor.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landmark.value;
    this.property.rtm = this.rtm.value;
    this.property.aop = this.aop.value;
    this.property.gated = this.gated.value;
    this.property.mainentrance = this.mainentrance.value;
    this.property.possession = this.possessionon.value;
    this.property.description = this.description.value;
    this.property.postedon = new Date().toString();
  }

  //#endregion



  //#region getter   method
  get sellrent() {
    return this.BasicInfo.controls.sellrent as FormControl;
  }

  get bhk() {
    return this.BasicInfo.controls.bhk as FormControl;
  }

  get ptype() {
    return this.BasicInfo.controls.ptype as FormControl;
  }

  get ftype() {
    return this.BasicInfo.controls.ftype as FormControl;
  }

  get name() {
    return this.BasicInfo.controls.name as FormControl;
  }

  get city() {
    return this.BasicInfo.controls.city as FormControl;
  }

  get price() {
    return this.PriceInfo.controls.price as FormControl;
  }

  get builtarea() {
    return this.PriceInfo.controls.builtarea as FormControl;
  }

  get carpetarea() {
    return this.PriceInfo.controls.carpetarea as FormControl;
  }

  get security() {
    return this.PriceInfo.controls.security as FormControl;
  }

  get maintenance() {
    return this.PriceInfo.controls.maintenance as FormControl;
  }

  get floorno() {
    return this.AddressInfo.controls.floorno as FormControl;
  }

  get totalfloor() {
    return this.AddressInfo.controls.totalfloor as FormControl;
  }

  get address() {
    return this.AddressInfo.controls.address as FormControl;
  }

  get landmark() {
    return this.AddressInfo.controls.landmark as FormControl;
  }

  get rtm() {
    return this.OtherInfo.controls.rtm as FormControl;
  }

  get possessionon() {
    return this.OtherInfo.controls.possessionon as FormControl;
  }

  get aop() {
    return this.OtherInfo.controls.aop as FormControl;
  }

  get gated() {
    return this.OtherInfo.controls.gated as FormControl;
  }

  get mainentrance() {
    return this.OtherInfo.controls.mainentrance as FormControl;
  }

  get description() {
    return this.OtherInfo.controls.description as FormControl;
  }

  //#endregion

  onSubmit(){
    this.mapProperty();
    this.housingService.addProperty(this.property);
    console.log(this.addPropertyForm.value);
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }

  }

}
