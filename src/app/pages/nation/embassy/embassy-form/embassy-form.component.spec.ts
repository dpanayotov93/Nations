import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbassyFormComponent } from './embassy-form.component';

describe('EmbassyFormComponent', () => {
  let component: EmbassyFormComponent;
  let fixture: ComponentFixture<EmbassyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbassyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbassyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
