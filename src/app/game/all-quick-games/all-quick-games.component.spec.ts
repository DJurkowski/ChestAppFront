import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuickGamesComponent } from './all-quick-games.component';

describe('AllQuickGamesComponent', () => {
  let component: AllQuickGamesComponent;
  let fixture: ComponentFixture<AllQuickGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQuickGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuickGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
