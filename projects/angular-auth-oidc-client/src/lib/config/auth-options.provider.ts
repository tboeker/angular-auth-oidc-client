import {AuthOptions, LogoutAuthOptions} from '../auth-options';
import {OpenIdConfiguration} from './openid-configuration';

export abstract class AuthOptionsProvider {

  abstract getLoginOptions(configuration: OpenIdConfiguration, authOptions?: AuthOptions);

  abstract getLogoutOptions(config: OpenIdConfiguration, logoutAuthOptions?: LogoutAuthOptions);

  // getLoginOptions(configuration: OpenIdConfiguration, authOptions?: AuthOptions) {
  //   return authOptions;
  // }

  // getLogoutOptions(config: OpenIdConfiguration, logoutAuthOptions?: LogoutAuthOptions) {
  //   return logoutAuthOptions;
  // }
}
