export interface IPasswordRes {
  password: string;
}

export enum EPasswordPromptType {
  PASSWORD_SETUP = 'setup',
  PASSWORD_VERIFY = 'verify',
}

export enum EPasswordMode {
  PASSCODE = 'passcode',
  PASSWORD = 'password',
}
