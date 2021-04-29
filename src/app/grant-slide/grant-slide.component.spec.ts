import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantSlideComponent } from './grant-slide.component';

describe('GrantSlideComponent', () => {
  let component: GrantSlideComponent;
  let fixture: ComponentFixture<GrantSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
