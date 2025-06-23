// src/app/pages/user/user-dashboard/user-dashboard.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
// **CRITICAL FIX: Corrected import to './user-dashboard' because your component file is user-dashboard.ts**
import { UserDashboardComponent } from './user-dashboard'; // Assuming user-dashboard.ts contains 'export class UserDashboardComponent'

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardComponent] // Still assuming it's a standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
