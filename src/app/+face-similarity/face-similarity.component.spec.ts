import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaceSimilarityComponent } from './face-similarity.component';

describe('FaceSimilarityComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FaceSimilarityComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FaceSimilarityComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(FaceSimilarityComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('client');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(FaceSimilarityComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to client!');
  });
});
