import { CompleteMedia } from './../../models/complete-media.models';
import { SimplifiedMedia } from './../../models/simplified-media.models';
import { AuthService } from '@auth0/auth0-angular';
import { Playlist } from './../../models/playlist.models';
import { MoviesService } from 'src/app/services/movie-service/movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetail } from 'src/app/models/movie-detail.model';
import testFilmsItemDetail from './../movie-list/mock-files/testFilmsItemDetail.json';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from 'src/app/services/media/media.service';
import userPlayListData from './mock-files/userPlayListData.json';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent  {

  isPlaylist=false;

  userPlaylist : Playlist[];

  selectedPlaylistId : number;
  
  @Input() movieId : any;

  movie! : CompleteMedia;

  simplifiedMedia: SimplifiedMedia;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private movieService: MoviesService,public activeModal: NgbActiveModal, private mediaService:  MediaService, public auth: AuthService) {
    this.movie = {
      id: '',
      title: '',
      fullTitle: '',
      type: '',
      year: 0,
      image: '',
      releaseDate: new Date(),
      runtimeMins: '',
      runtimeStr: '',
      plot: '',
      awards: '',
      directors: '',
      writers: '',
      stars: '',
      genres: '',
      imDbRating: '',
      tvSeriesInfo: {
        yearEnd: 0,
        creators: '',
        seasons: []
      }
    }

    this.userPlaylist = [];
    this.selectedPlaylistId = 0;
    this.simplifiedMedia = {
      imdbId: "",
      title : ""
    };

    const id: string = activatedRoute.snapshot.params.id;
    console.log(id)
  }

  ngOnInit(): void {
    this.getUserPlayList();

    // console.log(this.movieId)

    // this.movie = {
    //   id: testFilmsItemDetail.id,
    //   title: testFilmsItemDetail.title,
    //   fullTitle: testFilmsItemDetail.fullTitle,
    //   type: testFilmsItemDetail.type,
    //   year: testFilmsItemDetail.year,
    //   image: testFilmsItemDetail.image,
    //   releaseDate: testFilmsItemDetail.releaseDate,
    //   runtimeMins: testFilmsItemDetail.runtimeMins,
    //   runtimeStr: testFilmsItemDetail.runtimeStr,
    //   plot: testFilmsItemDetail.plot,
    //   awards: testFilmsItemDetail.awards,
    //   directors: testFilmsItemDetail.directors,
    //   writers: testFilmsItemDetail.writers,
    //   stars: testFilmsItemDetail.stars,
    //   genres: testFilmsItemDetail.genres,
    //   imdbRating: testFilmsItemDetail.imDbRating,
    //   tvSeriesInfo: {
    //     yearEnd: 123,
    //     creators: '',
    //     seasons: []
    //   }
    // }
    
    this.movieService.getMovieById(this.movieId).subscribe(
      result => {
        this.movie = result
      }
    )
  }

  addToPlaylist() {
    if(this.selectedPlaylistId===0) {
      console.log('You have to choose playlist!')
    } else {

      this.simplifiedMedia = {
        imdbId: this.movie.id,
        title:this.movie.title
      }

      this.mediaService.updatePlaylist(this.selectedPlaylistId,this.simplifiedMedia);
      
      this.router.navigateByUrl('/movies')
    }
  }


  getUserPlayList():void {
    
    this.userPlaylist=userPlayListData;
    console.log( this.userPlaylist)



    // this.mediaService.getMediaListByUserId(2).subscribe(
    //   result => {
        
    //     this.userPlayList=result;
    //     console.log(result)

    //   }
    // )
  }
}

