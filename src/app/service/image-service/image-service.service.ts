import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor(private http: HttpClient) {}
  readonly baseURL:string = "http://localhost:8000/api/users/"; 

  public uploadImage(image: File, email: string): Observable<any> {
    const formData = new FormData();
    
    formData.append('image', image);

    var json=JSON.stringify(formData);
    return this.http.post(this.baseURL +email+"/image", json);
  }
}
