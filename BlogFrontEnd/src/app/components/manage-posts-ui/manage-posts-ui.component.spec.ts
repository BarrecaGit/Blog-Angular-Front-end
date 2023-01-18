import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostsUIComponent } from './manage-posts-ui.component';

describe('ManagePostsUIComponent', () => {
  let component: ManagePostsUIComponent;
  let fixture: ComponentFixture<ManagePostsUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePostsUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePostsUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
