import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import UserDetails from 'src/app/models/user-details.model';
import { UserServiceService } from 'src/app/service/user-service/user-service.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  restoredSession: any;
  profileJson!: string;
  name = 'Angular 4';
  email!: string;
  username!: string;
  bio!: string;
  id!: number;
  url!: any;
  user!: AuthService["user$"];
  userDetails!: UserDetails;

  

  constructor(public auth: AuthService, private userService: UserServiceService, private httpClient: HttpClient) {
    this.name = 'Unregistered User';
    this.email = "";
    this.username = '';
    this.userDetails= new UserDetails("", "", "", "");
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        var test= JSON.stringify(profile, null, 2);
        this.profileJson = JSON.stringify(profile, null, 2);
        localStorage.setItem('profile', JSON.stringify(profile, null, 2)); 
      }
    );
    this.restoredSession = JSON.parse(localStorage.getItem('profile')!);
    this.userDetails.username=this.restoredSession.nickname;
    this.userDetails.email=this.restoredSession.email;
    this.userDetails.bio=this.restoredSession.bio;
    this.userDetails.image=this.restoredSession.picture;

    this.email = this.restoredSession.email;
    this.userService.getUserDetails(this.restoredSession.email).subscribe(
      (data) => {
        const databaseResponse=new UserDetails( data.email, data.username, data.bio, data.image);
     });
  }




 



    public test(email: string){
      console.log("input value for email: " + email)
      this.userService.getUserDetails(email).subscribe(
        (data2: UserDetails) => {
          const databaseResponse: UserDetails = data2;
          console.log("response bio from request: "+databaseResponse.bio);
       }
      );
      this.userService.postUserDetails(this.userDetails).subscribe(
        (data2: UserDetails) => {
         let databaseResponse: UserDetails = data2;
          console.log("response for random bio from request: "+databaseResponse.bio);
       }
      );
    }

    public getUserDetailsFromDB(){
     return this.userService.getUserDetails(this.restoredSession.nickname).subscribe(
       (data) => {
         const databaseResponse=new UserDetails( data.email, data.username, data.bio, data.image);
         this.userDetails = databaseResponse;
         console.log("user_details " + this.userDetails.email);
      });
       }


    public updateUserDetails(email: string, userDetails: UserDetails){
      return this.userService.updateUserDetails(email, userDetails).subscribe(
        (data) => {
          const databaseResponse: UserDetails = data;
       });
        }

}