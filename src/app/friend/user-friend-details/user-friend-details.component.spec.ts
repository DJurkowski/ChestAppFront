import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendDetailsComponent } from './user-friend-details.component';

describe('UserFriendDetailsComponent', () => {
  let component: UserFriendDetailsComponent;
  let fixture: ComponentFixture<UserFriendDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFriendDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
