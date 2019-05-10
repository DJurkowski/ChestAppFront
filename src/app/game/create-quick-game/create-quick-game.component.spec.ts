import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuickGameComponent } from './create-quick-game.component';

describe('CreateQuickGameComponent', () => {
  let component: CreateQuickGameComponent;
  let fixture: ComponentFixture<CreateQuickGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuickGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuickGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
