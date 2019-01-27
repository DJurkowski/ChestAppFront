import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentUserlistComponent } from './tournament-userlist.component';

describe('TournamentUserlistComponent', () => {
  let component: TournamentUserlistComponent;
  let fixture: ComponentFixture<TournamentUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
