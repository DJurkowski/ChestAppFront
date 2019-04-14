import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentDialogComponent } from './opponent-dialog.component';

describe('OpponentDialogComponent', () => {
  let component: OpponentDialogComponent;
  let fixture: ComponentFixture<OpponentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
