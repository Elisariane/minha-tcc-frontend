import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionToolsComponent } from './section-tools.component';

describe('SectionToolsComponent', () => {
  let component: SectionToolsComponent;
  let fixture: ComponentFixture<SectionToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
