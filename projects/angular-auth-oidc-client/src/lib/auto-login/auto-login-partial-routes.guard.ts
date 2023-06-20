import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthOptions } from '../auth-options';
import { AuthStateService } from '../auth-state/auth-state.service';
import { ConfigurationService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { AbstractAutoLoginAuthOptionsProvider } from './auto-login-auth-options.provider';
import { AutoLoginService } from './auto-login.service';

@Injectable({ providedIn: 'root' })
export class AutoLoginPartialRoutesGuard {
  constructor(
    private readonly autoLoginService: AutoLoginService,
    private readonly authStateService: AuthStateService,
    private readonly loginService: LoginService,
    private readonly configurationService: ConfigurationService,
    private readonly router: Router,
    private readonly autoLoginOptionsProvider: AbstractAutoLoginAuthOptionsProvider
  ) {}

  canLoad(): Observable<boolean> {
    const url =
      this.router
        .getCurrentNavigation()
        ?.extractedUrl.toString()
        .substring(1) ?? '';

    return checkAuth(
      url,
      this.configurationService,
      this.authStateService,
      this.autoLoginService,
      this.loginService,
      this.autoLoginOptionsProvider
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const authOptions: AuthOptions | undefined = route?.data
      ? { customParams: route.data }
      : undefined;

    return checkAuth(
      state.url,
      this.configurationService,
      this.authStateService,
      this.autoLoginService,
      this.loginService,
      this.autoLoginOptionsProvider,
      authOptions
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const authOptions: AuthOptions | undefined = route?.data
      ? { customParams: route.data }
      : undefined;

    return checkAuth(
      state.url,
      this.configurationService,
      this.authStateService,
      this.autoLoginService,
      this.loginService,
      this.autoLoginOptionsProvider,
      authOptions
    );
  }
}

export function autoLoginPartialRoutesGuard(): Observable<boolean> {
  const configurationService = inject(ConfigurationService);
  const authStateService = inject(AuthStateService);
  const loginService = inject(LoginService);
  const autoLoginService = inject(AutoLoginService);
  const router = inject(Router);
  const autoLoginOptionsProvider = inject(AbstractAutoLoginAuthOptionsProvider);

  const url =
    router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? '';

  return checkAuth(
    url,
    configurationService,
    authStateService,
    autoLoginService,
    loginService,
    autoLoginOptionsProvider
  );
}

function checkAuth(
  url: string,
  configurationService: ConfigurationService,
  authStateService: AuthStateService,
  autoLoginService: AutoLoginService,
  loginService: LoginService,
  autoLoginOptionsProvider: AbstractAutoLoginAuthOptionsProvider,
  authOptions?: AuthOptions
): Observable<boolean> {
  return configurationService.getOpenIDConfiguration().pipe(
    map((configuration) => {
      const isAuthenticated =
        authStateService.areAuthStorageTokensValid(configuration);

      if (isAuthenticated) {
        autoLoginService.checkSavedRedirectRouteAndNavigate(configuration);
      }

      if (!isAuthenticated) {
        autoLoginService.saveRedirectRoute(configuration, url);
        authOptions = autoLoginOptionsProvider.getAuthOptions(authOptions);
        if (authOptions) {
          loginService.login(configuration, authOptions);
        } else {
          loginService.login(configuration);
        }
      }

      return isAuthenticated;
    })
  );
}
