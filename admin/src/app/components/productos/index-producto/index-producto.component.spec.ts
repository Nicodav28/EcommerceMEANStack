import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductoComponent } from './index-producto.component';

describe('IndexProductoComponent', () => {
  let component: IndexProductoComponent;
  let fixture: ComponentFixture<IndexProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
