// src/app/login.service.spec.ts (Assuming this is the correct location of your spec file)

import { TestBed } from '@angular/core/testing';
// **CRITICAL FIX: Corrected import path for LoginService**
// If login.service.spec.ts is in 'src/app/'
// and login.service.ts is in 'src/app/pages/service/'
// Then the path is directly 'pages/service/login.service'
import { LoginService } from './pages/service/login.service';


describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
