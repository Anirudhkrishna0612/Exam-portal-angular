// src/app/pages/admin/sidebar/sidebar.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
// **CRITICAL FIX: Corrected import to './sidebar' because your component file is sidebar.ts**
import { SidebarComponent } from './sidebar'; // Assuming sidebar.ts contains 'export class SidebarComponent'

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent] // Still assuming it's a standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
