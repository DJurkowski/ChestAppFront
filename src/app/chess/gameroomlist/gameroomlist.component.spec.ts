import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameroomlistComponent } from './gameroomlist.component';

describe('GameroomlistComponent', () => {
  let component: GameroomlistComponent;
  let fixture: ComponentFixture<GameroomlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameroomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
