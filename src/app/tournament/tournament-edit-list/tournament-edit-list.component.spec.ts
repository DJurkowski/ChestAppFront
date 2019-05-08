import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentEditListComponent } from './tournament-edit-list.component';

describe('TournamentEditListComponent', () => {
  let component: TournamentEditListComponent;
  let fixture: ComponentFixture<TournamentEditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
