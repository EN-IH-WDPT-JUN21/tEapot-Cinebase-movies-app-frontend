import { CompleteMedia, iCompleteMedia } from './../../models/complete-media.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';

const mediaCacheObject: { [key: string]: CompleteMedia } = {};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  //Alternative apis
  // k_sg6g9gql
  // k_kf0sb0c0
  //k_sg6g9gql
  //k_uf7olahv
  

  private readonly apiKey='k_rdpl6ohr';
  private readonly baseUrl = 'https://imdb-api.com/en/API';
  
  constructor(private http: HttpClient) { }

  getTvSeries(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Top250Tvs/' +this.apiKey);
  }

  getFilms(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Top250Movies/' +this.apiKey);
  }

  searchSeriesByText(text:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/SearchSeries/'+this.apiKey + '/' +text);
  }

  searchFilmsByText(text:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/SearchMovie/'+this.apiKey + '/' +text);
  }

  getMovieById(id: string): Observable<CompleteMedia> {
    if (mediaCacheObject[id] == null) {
      let observableMedia = this.fetchMediaById(id);
      observableMedia.subscribe(result => mediaCacheObject[id] = result);
      return observableMedia;
    }
    console.log(mediaCacheObject[id]);
    return Observable.of(mediaCacheObject[id]);
  }
  fetchMediaById(id: string): Observable<any> {
    console.log(`fetch media: ${id}`);
    return this.http.get<iCompleteMedia>(this.baseUrl+ '/Title/' + this.apiKey + '/' + id)
    .map((rawData: iCompleteMedia) => this.mapCompleteMedia(rawData))
    .publish()
    .refCount();
  }
  private mapCompleteMedia(body: iCompleteMedia) {
    return new CompleteMedia(body);
  }
}
