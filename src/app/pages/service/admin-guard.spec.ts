// src/app/pages/service/admin-guard.spec.ts

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For RouterTestingModule
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // For MatSnackBar
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // **CRITICAL FIX: Import RouterStateSnapshot and ActivatedRouteSnapshot**
import { of } from 'rxjs'; // For creating observables in mocks

import { AdminGuard } from './admin-guard';
import { LoginService } from './login.service'; // **CRITICAL FIX: Import LoginService**


// Mock LoginService
class MockLoginService {
  isLoggedIn = jasmine.createSpy('isLoggedIn').and.returnValue(true);
  getUserRole = jasmine.createSpy('getUserRole').and.returnValue('ADMIN');
  logout = jasmine.createSpy('logout');
  loginStatusSubject = { asObservable: () => of(true) }; // Mock BehaviorSubject
  // Add other methods that the guard might use from LoginService
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  // **CRITICAL FIX: Use LoginService type for the mocked service**
  let loginService: MockLoginService; // Renamed from authService to loginService
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), // Provides Router mock, with empty routes for simplicity
        MatSnackBarModule // Provide MatSnackBarModule for the snackBar
      ],
      providers: [
        AdminGuard,
        // **CRITICAL FIX: Provide MockLoginService for LoginService**
        { provide: LoginService, useClass: MockLoginService },
        // MatSnackBar is provided by MatSnackBarModule, but we can get an instance
      ]
    });

    guard = TestBed.inject(AdminGuard);
    loginService = TestBed.inject(LoginService) as unknown as MockLoginService; // **CRITICAL FIX: Inject LoginService**
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar); // Inject MatSnackBar
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Test case for ADMIN role accessing ADMIN route
  it('should allow access for ADMIN role to ADMIN route', () => {
    // **CRITICAL FIX: Spy on loginService, not authService**
    loginService.isLoggedIn.and.returnValue(true);
    loginService.getUserRole.and.returnValue('ADMIN');

    // ActivatedRouteSnapshot mock for an ADMIN route
    const routeMock: ActivatedRouteSnapshot = { data: { requiredRole: 'ADMIN' } } as any;
    const stateMock: RouterStateSnapshot = { url: '/admin' } as any;

    const canActivateResult = guard.canActivate(routeMock, stateMock);
    expect(canActivateResult).toBe(true);
  });

  // Test case for non-admin role accessing ADMIN route (should be denied)
  it('should deny access for NORMAL role to ADMIN route', () => {
    loginService.isLoggedIn.and.returnValue(true);
    loginService.getUserRole.and.returnValue('NORMAL'); // Mock as NORMAL user
    spyOn(router, 'navigate'); // Spy on router navigation
    spyOn(snackBar, 'open'); // Spy on snackBar messages

    const routeMock: ActivatedRouteSnapshot = { data: { requiredRole: 'ADMIN' } } as any;
    const stateMock: RouterStateSnapshot = { url: '/admin' } as any;

    const canActivateResult = guard.canActivate(routeMock, stateMock);
    expect(canActivateResult).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(snackBar.open).toHaveBeenCalled();
  });

  // Test case for not logged in accessing ADMIN route (should be denied)
  it('should deny access if not logged in to ADMIN route', () => {
    loginService.isLoggedIn.and.returnValue(false); // Mock as not logged in
    spyOn(router, 'navigate');
    spyOn(snackBar, 'open');

    const routeMock: ActivatedRouteSnapshot = { data: { requiredRole: 'ADMIN' } } as any;
    const stateMock: RouterStateSnapshot = { url: '/admin' } as any;

    const canActivateResult = guard.canActivate(routeMock, stateMock);
    expect(canActivateResult).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(snackBar.open).toHaveBeenCalled();
  });

  // Add more test cases as needed for specific scenarios
});
