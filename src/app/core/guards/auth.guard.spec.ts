import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getAuth']);
    const rSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: rSpy },
      ],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', () => {
    authServiceSpy.getAuth.and.returnValue({ token: 'fake-token' });

    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should redirect to login when user is not authenticated', () => {
    authServiceSpy.getAuth.and.returnValue(null);
    const fakeUrlTree = {} as any;
    routerSpy.parseUrl.and.returnValue(fakeUrlTree);

    const result = executeGuard({} as any, {} as any);
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(fakeUrlTree);
  });
});
