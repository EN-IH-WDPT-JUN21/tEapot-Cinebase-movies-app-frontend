import { Component, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie-modal',
  template: ''
})
export class MovieModalComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: NgbModalRef | undefined;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    router: Router
  ) {
   
    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

        this.currentDialog = this.modalService.open(MovieDetailComponent, {centered:true});

        // When router navigates on this component is takes the params and opens up the photo detail modal
        this.currentDialog.componentInstance.movie = params.id;

        // Go back to home page after the modal is closed
        this.currentDialog.result.then(result => {
            router.navigateByUrl('/movies');
        }, reason => {
            router.navigateByUrl('/movies');
        });
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
