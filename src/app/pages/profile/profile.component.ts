import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import UserDetails from 'src/app/models/user-details.model';
import { UserServiceService } from 'src/app/service/user-service/user-service.service';
import { ImageService } from 'src/app/service/image-service/image-service.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  restoredSession: any;
  profileJson!: string;
  email: string;
  img: string;
  username!: string;
  bio: string;
  id: number;
  url!: any;
  user!: AuthService["user$"];
  userDetails!: UserDetails;
  selectedFile: ImageSnippet;

  
  constructor(public auth: AuthService, private userService: UserServiceService, private httpClient: HttpClient, private imageService: ImageService) {
    this.id=localStorage.id;
    this.username = localStorage.name;
    this.email = localStorage.email;
    this.username = localStorage.username;
    this.img=localStorage.image;
    this.bio=localStorage.bio;
    this.userDetails= localStorage.UserDetails;
    this.selectedFile = localStorage.image;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        localStorage.setItem('profile', JSON.stringify(profile, null, 2)); 
      }
    );
    this.restoredSession = JSON.parse(localStorage.getItem('profile')!);
    this.getUserDetails(this.restoredSession.email);
  }

    public getUserDetails(email:string){
      this.userService.getUserDetails(email).subscribe(
        (data) => {
          this.id=data.id;
          this.username=data.username;
          this.email=data.email;
          this.bio=data.bio;
          this.url=data.image;
          console.log(data);
       });
       }


    public updateUserDetails(email: string, userDetails: UserDetails){
      return this.userService.updateUserDetails(email, userDetails).subscribe(
        (data) => {
          this.id=data.id;
          this.username=data.username;
          this.email=data.email;
          this.bio=data.bio;
          this.url=data.image;
          this.userDetails.id=data.id;
          this.userDetails.username=data.name;
          this.userDetails.email=data.email;
          this.userDetails.bio=data.bio;
          this.userDetails.image=data.image;
       });
      }

      onSelectFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();
    
        reader.addEventListener('load', (event: any) => {
    
          this.selectedFile = new ImageSnippet(event.target.result, file);
    
          this.imageService.uploadImage(this.selectedFile.file, this.email).subscribe(
            (res) => {
            
            },
            (err) => {
            
            })
        });
    
        reader.readAsDataURL(file);
      }



    }