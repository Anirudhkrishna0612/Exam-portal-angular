// src/app/pages/service/admin-guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router'; // Ensure UrlTree is imported
import { AdminGuard } from './admin-guard';
import { LoginService } from '../../login.service';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let loginService: LoginService;
  let router: Router; // Keep router for parseUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        {
          provide: LoginService,
          useValue: {
            isLoggedIn: () => true,
            getUserRole: () => 'ADMIN',
            logout: () => {},
          }
        },
      ],
    });
    guard = TestBed.inject(AdminGuard);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for ADMIN role', () => {
    spyOn(loginService, 'isLoggedIn').and.returnValue(true);
    spyOn(loginService, 'getUserRole').and.returnValue('ADMIN');
    const canActivateResult = guard.canActivate({} as any, {} as any);
    expect(canActivateResult).toBe(true);
  });

  it('should redirect to login if not logged in', () => {
    spyOn(loginService, 'isLoggedIn').and.returnValue(false);
    spyOn(loginService, 'logout');
    // **CRITICAL FIX: Mock parseUrl to return an actual UrlTree instance**
    spyOn(router, 'parseUrl').and.returnValue(router.parseUrl('/login')); // Now it returns a real UrlTree

    const canActivateResult = guard.canActivate({} as any, {} as any);

    expect(loginService.logout).toHaveBeenCalled();
    // **CRITICAL FIX: Assert it's a UrlTree and check its string representation**
    expect(canActivateResult).toBeInstanceOf(UrlTree); // Check if it's an instance of UrlTree
    expect((canActivateResult as UrlTree).toString()).toBe('/login'); // Convert to string and compare
  });

  it('should redirect to login if role is not ADMIN', () => {
    spyOn(loginService, 'isLoggedIn').and.returnValue(true);
    spyOn(loginService, 'getUserRole').and.returnValue('NORMAL');
    spyOn(loginService, 'logout');
    // **CRITICAL FIX: Mock parseUrl to return an actual UrlTree instance**
    spyOn(router, 'parseUrl').and.returnValue(router.parseUrl('/login')); // Returns a real UrlTree

    const canActivateResult = guard.canActivate({} as any, {} as any);
    expect(loginService.logout).toHaveBeenCalled();
    // **CRITICAL FIX: Assert it's a UrlTree and check its string representation**
    expect(canActivateResult).toBeInstanceOf(UrlTree);
    expect((canActivateResult as UrlTree).toString()).toBe('/login');
  });
});
