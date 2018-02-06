import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbassyComponent } from './embassy.component';

describe('EmbassyComponent', () => {
  let component: EmbassyComponent;
  let fixture: ComponentFixture<EmbassyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbassyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
