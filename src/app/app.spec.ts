// src/app/app.spec.ts

import { TestBed } from '@angular/core/testing';
// **CRITICAL FIX: Import AppComponent (the standard Angular root component name)**
import { AppComponent } from './app'; // Assuming your app.ts file contains 'export class AppComponent'
import { RouterTestingModule } from '@angular/router/testing'; // For testing router links if present in AppComponent's template

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // **CRITICAL FIX: Import AppComponent directly (as it's a standalone component)**
      // Also, include RouterTestingModule if your AppComponent's template uses router-outlet or routerLink
      imports: [AppComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Example: Test if the title property exists (if you have one in AppComponent)
  // it(`should have as title 'examfront'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('examfront'); // Adjust 'examfront' to your actual title
  // });

  // Example: Test if a specific element exists in the rendered HTML
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('examfront app is running!'); // Adjust selector and text
  // });
});
