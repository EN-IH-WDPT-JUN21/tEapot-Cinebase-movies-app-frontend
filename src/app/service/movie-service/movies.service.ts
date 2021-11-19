import { CompleteMedia, iCompleteMedia } from './../../models/complete-media.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';

const mediaCache: { [key: string]: Observable<CompleteMedia> } = {};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // k_sg6g9gql
  // k_kf0sb0c0

  private readonly apiKey='k_kf0sb0c0';
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

  getMovieById(id: string): Observable<any> {
    if (mediaCache[id] == null) {
      mediaCache[id] = this.fetchMediaById(id);
    }
    // mediaCache[id] = mediaCache[id] || this.fetchMediaById(id);
    console.log(mediaCache[id]);
    mediaCache[id].subscribe(data => console.log(data));
    return mediaCache[id];
  }

  fetchMediaById(id: string): Observable<any> {
    console.log(`fetch media: ${id}`);
    return this.http.get<iCompleteMedia>(this.baseUrl+ '/Title/' + this.apiKey + '/' + id)
    .map(rawData => this.mapCompleteMedia(rawData))
    .publish()
    .refCount();
  }

  private mapCompleteMedia(body: iCompleteMedia) {
    return new CompleteMedia(body);
  }
}
