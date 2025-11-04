import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopic } from './add-topic';

describe('AddTopic', () => {
  let component: AddTopic;
  let fixture: ComponentFixture<AddTopic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTopic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTopic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
