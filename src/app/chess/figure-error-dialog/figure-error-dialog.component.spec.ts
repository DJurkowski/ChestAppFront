import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureErrorDialogComponent } from './figure-error-dialog.component';

describe('FigureErrorDialogComponent', () => {
  let component: FigureErrorDialogComponent;
  let fixture: ComponentFixture<FigureErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigureErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
