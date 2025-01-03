import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedBooksComponentComponent } from './related-books-component.component';

describe('RelatedBooksComponentComponent', () => {
  let component: RelatedBooksComponentComponent;
  let fixture: ComponentFixture<RelatedBooksComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedBooksComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedBooksComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
