import { AuthOptions } from '../auth-options';
import { OpenIdConfiguration } from '../config/openid-configuration';
import { AbstractAutoLoginAuthOptionsProvider } from './auto-login-auth-options.provider';

export class DefaultAutoLoginAuthOptionsProvider extends AbstractAutoLoginAuthOptionsProvider {
  getAuthOptions(
    configuration: OpenIdConfiguration,
    authOptions?: AuthOptions
  ): AuthOptions {
    return authOptions;
  }
}
