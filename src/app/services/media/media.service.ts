import { SimplifiedMedia } from '../../models/simplified-media.models';
import { Playlist } from '../../models/playlist.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly baseUrl = 'http://localhost:8000/api/playlist'

  constructor(private http: HttpClient) { }

  getMediaLists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl);
  }

  getMediaList(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseUrl}/${id}`);
  }

  getMediaListByUserEmail(email: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.baseUrl}?email=${email}`);
  }

  createPlaylist(playlist: Playlist): void {
    this.http.post<void>(`${this.baseUrl}`, playlist);
  }

  updatePlaylist(id: number, media: SimplifiedMedia): void {
    this.http.patch<void>(`${this.baseUrl}/${id}`, media);
  }

  deleteMovie(playlistId: number, imdbId: number): void {
    this.http.delete<void>(`${this.baseUrl}/delete?playlistId=${playlistId}&imdbId=${imdbId}`);
  }

  deletePlaylist(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
