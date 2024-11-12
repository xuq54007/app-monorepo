import { BaseScene } from '../../../base/baseScene';
import { LogToLocal } from '../../../base/decorators';

export class PasswordScene extends BaseScene {
  @LogToLocal()
  public verifying() {}

  @LogToLocal()
  public encodeSensitiveText() {}

  @LogToLocal()
  public verifyPassword() {}

  @LogToLocal()
  public verifiedPassword() {}

  @LogToLocal()
  public onVerifying() {}

  @LogToLocal()
  public onVerified() {}

  @LogToLocal()
  public verifyingByBiologyAuth() {}

  @LogToLocal()
  public getBiologyAuthPassword() {}

  @LogToLocal()
  public ensureSensitiveTextEncoded() {}

  @LogToLocal()
  public validatePassword() {}

  @LogToLocal()
  public setCachedPassword() {}

  @LogToLocal()
  public biologyAuthenticate() {}

  @LogToLocal()
  public biologyAuthenticated() {}

  @LogToLocal()
  public getPasswordInBiologyAuth() {}

  @LogToLocal()
  public ensureSensitiveTextEncodedInBiologyAuth() {}

  @LogToLocal()
  public getEnsureSensitiveTextEncodedInBiologyAuth() {}

  @LogToLocal()
  public onBiologyAuthenticate() {}

  @LogToLocal()
  public startBiologyAuth() {}
}
