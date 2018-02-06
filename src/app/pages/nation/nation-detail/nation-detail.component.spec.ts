import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationDetailComponent } from './nation-detail.component';

describe('NationDetailComponent', () => {
  let component: NationDetailComponent;
  let fixture: ComponentFixture<NationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
