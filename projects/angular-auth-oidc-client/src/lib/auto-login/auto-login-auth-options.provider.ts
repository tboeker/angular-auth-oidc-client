import { Injectable } from '@angular/core';
import { AuthOptions } from '../auth-options';
import { OpenIdConfiguration } from '../config/openid-configuration';

@Injectable({ providedIn: 'root' })
export abstract class AbstractAutoLoginAuthOptionsProvider {
  abstract getAuthOptions(
    configuration: OpenIdConfiguration,
    authOptions?: AuthOptions
  ): AuthOptions;
}
