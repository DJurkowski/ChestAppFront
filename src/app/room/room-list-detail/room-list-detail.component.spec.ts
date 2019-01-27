import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListDetailComponent } from './room-list-detail.component';

describe('RoomListDetailComponent', () => {
  let component: RoomListDetailComponent;
  let fixture: ComponentFixture<RoomListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
