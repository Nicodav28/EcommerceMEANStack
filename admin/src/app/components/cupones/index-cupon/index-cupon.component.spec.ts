import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCuponComponent } from './index-cupon.component';

describe('IndexCuponComponent', () => {
  let component: IndexCuponComponent;
  let fixture: ComponentFixture<IndexCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCuponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
