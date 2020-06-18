import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  @Input() profile:any = {};

  ngOnInit(): void {
  }

  get profileAddress(){
    if(this.profile.address) {
      let addressObj = this.profile.address;
      let address = addressObj.building + ', ' +
                    addressObj.street + '<br>' +
                    addressObj.city + ', ' +
                    addressObj.state + ', ' +
                    'PIN: ' + addressObj.zipCode

      return address;
    }
    return '';
  }
}
