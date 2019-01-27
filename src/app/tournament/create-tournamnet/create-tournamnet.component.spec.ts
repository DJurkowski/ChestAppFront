import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamnetComponent } from './create-tournamnet.component';

describe('CreateTournamnetComponent', () => {
  let component: CreateTournamnetComponent;
  let fixture: ComponentFixture<CreateTournamnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTournamnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournamnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
