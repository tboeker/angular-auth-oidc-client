import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://login.microsoftonline.com/29abe415-d035-4d18-9ccd-4f085365e073/v2.0',
        authWellknownEndpointUrl: 'https://login.microsoftonline.com/29abe415-d035-4d18-9ccd-4f085365e073/v2.0',
        redirectUrl: window.location.origin,
        clientId: '09192cbe-f38d-4434-8da7-0de7bc768887',
        // scope: 'openid profile offline_access email api://09192cbe-f38d-4434-8da7-0de7bc768887/access_as_user',
        scope: 'openid profile offline_access email Team.ReadBasic.All Channel.ReadBasic.All ChannelMessage.Send ChannelMessage.Read.All Chat.ReadBasic Chat.ReadWrite',
        responseType: 'code',
        silentRenew: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: true,
        autoUserInfo: false,
        // silentRenewUrl: window.location.origin + '/silent-renew.html',
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        customParamsAuthRequest: {
          prompt: 'select_account', // login, consent
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
