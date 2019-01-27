import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamnetDetailsComponent } from './tournamnet-details.component';

describe('TournamnetDetailsComponent', () => {
  let component: TournamnetDetailsComponent;
  let fixture: ComponentFixture<TournamnetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamnetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamnetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
