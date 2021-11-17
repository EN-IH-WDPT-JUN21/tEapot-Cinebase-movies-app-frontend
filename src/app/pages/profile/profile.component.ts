import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import UserDetails from 'src/app/models/user-details.model';
import { UserServiceService } from 'src/app/service/user-service/user-service.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{

  restoredSession: any;
  profileJson!: string;
  name = 'Angular 4';
  email!: string;
  username!: string;
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
  

  constructor(public auth: AuthService, private userService: UserServiceService, private httpClient: HttpClient, private elementRef: ElementRef) {
    this.name = 'Unregistered User';
    this.email = "";
    this.username = '';
    this.userDetails= new UserDetails(0, "", "", "", "");
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        var test= JSON.stringify(profile, null, 2);
        this.profileJson = JSON.stringify(profile, null, 2);

        localStorage.setItem('profile', JSON.stringify(profile, null, 2));
        this.userService.getUserDetails(this.restoredSession.nickname).subscribe(
          (data) => {
            const databaseResponse=new UserDetails(data.id, data.email, data.username, data.name, data.image);
            this.userDetails = databaseResponse;
            console.log("user_details test api " + this.userDetails.email);
         });
    
      }
    );
    
    this.restoredSession = JSON.parse(localStorage.getItem('profile')!);
    this.username = this.restoredSession.nickname;
    this.email = this.restoredSession.email;
    console.log("test of " + this.restoredSession.nickname);
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
    this.userService.updateUserDetails(this.username, this.userDetails)
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
      this.userDetails.image=this.selectedFile;
      this.userService.updateUserDetails(this.username, this.userDetails)
      .subscribe(
                   res => {console.log(res);
                           this.receivedImageData = res;
                           this.base64Data = this.receivedImageData.pic;
                           this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                   err => console.log('Error Occured duringng saving: ' + err)
                );

    }
  }

   public delete(){
    this.url = null;
    }
    public test(){
      this.userService.updateUserDetails(this.username, this.userDetails).subscribe();
    }

    public getUserDetailsFromDB(){
      console.log("object: " + this.restoredSession.nickname);
     return this.userService.getUserDetails(this.restoredSession.nickname).subscribe(
       (data) => {
         const databaseResponse=new UserDetails(data.id, data.email, data.username, data.name, data.image);
         this.userDetails = databaseResponse;
         console.log("user_details " + this.userDetails.email);
      });
       }

    public updateUserDetails(username: string, userDetails: UserDetails){
      return this.userService.updateUserDetails(username, userDetails).subscribe(
        (data) => {
          const databaseResponse: UserDetails = data;
       });
        }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundImage = 'url("assets/img/screen_wide.png")';
    }

}