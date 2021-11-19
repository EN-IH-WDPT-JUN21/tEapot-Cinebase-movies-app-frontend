import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import UserDetails from 'src/app/models/user-details.model';
import { UserServiceService } from 'src/app/service/user-service/user-service.service';
import { ImageService } from 'src/app/service/image-service/image-service.service';
import { User } from '@auth0/auth0-spa-js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() src: any;
  restoredSession: any;
  profileJson!: string;
  email!: string;
  img:any;
  username!: string;
  bio!: string;
  id!: number;
  user!: AuthService["user$"];
  userDetails: UserDetails;
  selectedFile!: ImageSnippet;
  imageId!: number;

  isImageLoading: boolean = false;
  
  constructor(public auth: AuthService, private userService: UserServiceService, private httpClient: HttpClient, private imageService: ImageService) {
    // this.id=localStorage.UserDetails.id;
    // this.username = localStorage.UserDetails.name;
    // this.email = localStorage.UserDetails.email;
    // this.username = localStorage.UserDetails.username;
    // this.img=localStorage.UserDetails.image;
    // this.bio=localStorage.UserDetails.bio;
    // this.imageId=localStorage.UserDetails.imageId;
     this.userDetails= localStorage.UserDetails;
    // this.selectedFile = localStorage.UserDetails.image;
  }

  ngOnInit(): void {
    //GET AUTHENTICATION
    this.auth.user$.subscribe(
      (profile) => {
        localStorage.setItem('profile', JSON.stringify(profile, null, 2)); 
        let tempDetails=JSON.parse(localStorage.getItem('profile')!);
        this.userService.getUserDetails(tempDetails.email).subscribe(
          (data) => {
              if( data.email!="" && data.email!=null){
              this.userDetails=data;
              localStorage.setItem('UserDetails', JSON.stringify(this.userDetails));
              if(this.userDetails.imageId!=null){
                this.getImageFromService(this.userDetails.imageId);
              }
              }
              else{
              tempDetails.username=tempDetails.nickname;
              this.userService.postUserDetails(tempDetails).subscribe(
                  (data) => {
                          this.userDetails=data;
                          if(this.userDetails.username==null){
                             this.userDetails=tempDetails.nickname;
                            }
                  localStorage.setItem('UserDetails', JSON.stringify(this.userDetails));
                },
            );
          }
          });
        if( this.userDetails.imageId!=null && this.userDetails.imageId!=0){
          this.getImageFromService(this.userDetails.imageId);
        }
        this.userDetails=localStorage.UserDetails,
        this.username=localStorage.UserDetails.username,
        this.email=localStorage.UserDetails.email,
        this.bio=localStorage.UserDetails.bio,
        this.imageId=localStorage.UserDetails.imageId
        if(this.userDetails.imageId!=null && this.userDetails.imageId!=0){
        }
      },
    );
  }


    public defaultImg: string = 'https://bootdey.com/img/Content/avatar/avatar7.png';
    public onError() {
        this.src = this.defaultImg;
    }
    public checkPath(src: any) {
        return src ? src : this.defaultImg;
    }





    public getUserDetails(details: UserDetails): UserDetails{
      this.userService.getUserDetails(details.email).subscribe(
        (data) => {
          details.id=data.id;
          details.username=data.username;
          details.email=data.email;
          details.bio=data.bio;
          details.imageId=data.imageId;
       });
       return details;
       }


    public updateUserDetails(email: string, userDetails: UserDetails){
      return this.userService.updateUserDetails(email, userDetails).subscribe(
        (data) => {
          this.id=data.id;
          this.username=data.username;
          this.email=data.email;
          this.bio=data.bio;
          this.userDetails.id=data.id;
          this.userDetails.username=data.name;
          this.userDetails.email=data.email;
          this.userDetails.bio=data.bio;
          this.userDetails.imageId=data.image;
       });
      }


      processFile(imageInput: any,  email: string) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();
        console.log(email)
        reader.addEventListener('load', (event: any) => {
    
          this.selectedFile = new ImageSnippet(event.target.result, file);
          this.imageService.uploadImage(this.selectedFile.file,  email).subscribe(
            (res) => {
              console.log("res: "+res);
              this.getImageFromService(res);
              this.userDetails.imageId=res.valueOf();
              localStorage.UserDetails.userDetails;
            },
            (err) => {
            
            })
        });
    
        reader.readAsDataURL(file);

      }






    createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.img = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
        this.img=reader.result;
      }
    }

  getImageFromService(imageId: number) {
      this.isImageLoading = true;
      this.imageService.getImage(imageId).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
      }, 
      error => {
        this.isImageLoading = false;
        console.log(error);
    });

  }
}