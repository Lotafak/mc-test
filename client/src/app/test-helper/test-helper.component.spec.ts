import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHelperComponent } from './test-helper.component';

describe('TestHelperComponent', () => {
  let component: TestHelperComponent;
  let fixture: ComponentFixture<TestHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
