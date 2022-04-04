import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  propertyId : number;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.propertyId = this.activatedRoute.snapshot.params['id'];
  }

}
