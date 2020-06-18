import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  userProfile:any = {}
  isLoading:boolean = true;
  hasError:boolean = false;
  errorMsg: string = "We're sorry. An error has occured and are unable to fetch your profile.";
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getClientProfile().subscribe((res) => {
      this.userProfile = res;
      this.isLoading = false;
    }, (err:HttpErrorResponse) => {
      this.isLoading = false;
      this.hasError = true;
      if(err.status === 404) {
        this.errorMsg = err.error;
      }
    })
  }
}
