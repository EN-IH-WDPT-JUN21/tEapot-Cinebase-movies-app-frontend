import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaListComponent } from './all-media-list.component';

describe('AllMediaListComponent', () => {
  let component: AllMediaListComponent;
  let fixture: ComponentFixture<AllMediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMediaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
