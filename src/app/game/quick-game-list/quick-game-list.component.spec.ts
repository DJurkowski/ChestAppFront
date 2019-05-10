import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickGameListComponent } from './quick-game-list.component';

describe('QuickGameListComponent', () => {
  let component: QuickGameListComponent;
  let fixture: ComponentFixture<QuickGameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickGameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
