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


  //image data
  public selectedFile!:any;
  public event1!: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  

  constructor(public auth: AuthService, private userService: UserServiceService, private httpClient: HttpClient) {
    this.name = 'Unregistered User';
    this.email = "";
    this.username = '';
    this.userDetails= new UserDetails("", "", "");
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
    this.username = this.restoredSession.nickname;
    this.email = this.restoredSession.email;
    this.userService.getUserDetails(this.restoredSession.email).subscribe(
      (data) => {
        const databaseResponse=new UserDetails( data.email, data.username, data.bio);
     });
  }


  public  onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };

 }

  // This part is for uploading
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.userDetails.image=this.selectedFile;
    this.userService.updateUserDetails(this.email, this.userDetails)
    .subscribe(
                 res => {console.log(res);
                         this.receivedImageData = res;
                         this.base64Data = this.receivedImageData.pic;
                         this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                 err => console.log('Error Occured duringng saving: ' + err)
              );
              
   }




  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader() ;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target!.result;
      }
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile);
      this.userDetails=this.restoredSession;
      this.userDetails.image=this.selectedFile;
      this.userService.updateUserDetails(this.email, this.userDetails)
      .subscribe(
                   res => {console.log(res);
                           this.receivedImageData = res;
                           this.base64Data = this.receivedImageData.pic;
                           this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                   err => console.log('Error Occured duringng saving: ' + err)
                );

    }
  }



    public test(email: string){
      console.log("input value for email: " + email)
      this.userService.getUserDetails(email).subscribe(
        (data2: UserDetails) => {
          const databaseResponse: UserDetails = data2;
          console.log("response bio from request: "+databaseResponse.bio);
       }
      );
      let userDetailsRandom: UserDetails = new UserDetails("randomUser", "random mail", "randomBio");
      this.userService.postUserDetails(userDetailsRandom).subscribe(
        (data2: UserDetails) => {
         let databaseResponse: UserDetails = data2;
          console.log("response for random bio from request: "+databaseResponse.bio);
       }
      );
    }

    public getUserDetailsFromDB(){
     return this.userService.getUserDetails(this.restoredSession.nickname).subscribe(
       (data) => {
         const databaseResponse=new UserDetails( data.email, data.username, data.bio);
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