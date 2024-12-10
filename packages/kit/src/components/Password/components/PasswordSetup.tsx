import { memo, useEffect, useMemo, useState } from 'react';

import { useIntl } from 'react-intl';

import { Button, Form, Input, Unspaced, useForm } from '@onekeyhq/components';
import { EPasswordMode } from '@onekeyhq/kit-bg/src/services/ServicePassword/types';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import {
  PassCodeRegex,
  PasswordRegex,
  getPasswordKeyboardType,
} from '../utils';

import PassCodeInput, { PIN_CELL_COUNT } from './PassCodeInput';

export interface IPasswordSetupForm {
  password: string;
  confirmPassword: string;
  passwordMode: EPasswordMode;
  passCode: string;
  confirmPassCode: string;
}
interface IPasswordSetupProps {
  loading: boolean;
  passwordMode: EPasswordMode;
  onSetupPassword: (data: IPasswordSetupForm) => void;
  biologyAuthSwitchContainer?: React.ReactNode;
  confirmBtnText?: string;
}

const PasswordSetup = ({
  loading,
  passwordMode,
  onSetupPassword,
  confirmBtnText,
  biologyAuthSwitchContainer,
}: IPasswordSetupProps) => {
  const intl = useIntl();
  const [currentPasswordMode, setCurrentPasswordMode] = useState(passwordMode);
  const [passCodeConfirm, setPassCodeConfirm] = useState(false);
  useEffect(() => {
    setCurrentPasswordMode(passwordMode);
  }, [passwordMode]);
  const form = useForm<IPasswordSetupForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
      passCode: '',
      confirmPassword: '',
      confirmPassCode: '',
      passwordMode: currentPasswordMode,
    },
  });
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureReentry, setSecureReentry] = useState(true);
  const passCodeFirstStep = useMemo(
    () => currentPasswordMode === EPasswordMode.PASSCODE && !passCodeConfirm,
    [currentPasswordMode, passCodeConfirm],
  );
  const confirmBtnTextMemo = useMemo(() => {
    if (passCodeFirstStep) {
      return intl.formatMessage({ id: ETranslations.global_next });
    }
    return (
      confirmBtnText ??
      intl.formatMessage({ id: ETranslations.auth_set_password })
    );
  }, [confirmBtnText, intl, passCodeFirstStep]);
  const onPassCodeNext = () => {
    setPassCodeConfirm(true);
  };

  return (
    <Form form={form}>
      {currentPasswordMode === EPasswordMode.PASSWORD ? (
        <>
          <Form.Field
            label={intl.formatMessage({
              id: ETranslations.auth_new_password_form_label,
            })}
            name="password"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  id: ETranslations.auth_error_password_empty,
                }),
              },
              minLength: {
                value: 8,
                message: intl.formatMessage(
                  { id: ETranslations.auth_error_password_too_short },
                  {
                    length: 8,
                  },
                ),
              },
              maxLength: {
                value: 128,
                message: intl.formatMessage(
                  {
                    id: ETranslations.auth_erro_password_too_long,
                  },
                  {
                    length: 128,
                  },
                ),
              },
              onChange: () => {
                form.clearErrors();
              },
            }}
          >
            <Input
              size="large"
              $gtMd={{
                size: 'medium',
              }}
              placeholder={intl.formatMessage({
                id: ETranslations.auth_new_password_form_placeholder,
              })}
              disabled={loading}
              autoFocus
              keyboardType={getPasswordKeyboardType(!secureEntry)}
              onChangeText={(text) => text.replace(PasswordRegex, '')}
              secureTextEntry={secureEntry}
              addOns={[
                {
                  iconName: secureEntry ? 'EyeOutline' : 'EyeOffOutline',
                  onPress: () => {
                    setSecureEntry(!secureEntry);
                  },
                  testID: `password-eye-${secureEntry ? 'off' : 'on'}`,
                },
              ]}
              testID="password"
            />
          </Form.Field>
          <Form.Field
            label={intl.formatMessage({
              id: ETranslations.auth_confirm_password_form_label,
            })}
            name="confirmPassword"
            rules={{
              validate: {
                equal: (v, values) => {
                  const state = form.getFieldState('password');
                  if (!state.error) {
                    return v !== values.password
                      ? intl.formatMessage({
                          id: ETranslations.auth_error_password_not_match,
                        })
                      : undefined;
                  }
                  return undefined;
                },
              },
              onChange: () => {
                form.clearErrors('confirmPassword');
              },
            }}
          >
            <Input
              size="large"
              $gtMd={{
                size: 'medium',
              }}
              placeholder={intl.formatMessage({
                id: ETranslations.auth_confirm_password_form_placeholder,
              })}
              disabled={loading}
              keyboardType={getPasswordKeyboardType(!secureReentry)}
              onChangeText={(text) => text.replace(PasswordRegex, '')}
              secureTextEntry={secureReentry}
              addOns={[
                {
                  iconName: secureReentry ? 'EyeOutline' : 'EyeOffOutline',
                  onPress: () => {
                    setSecureReentry(!secureReentry);
                  },
                  testID: `confirm-password-eye-${
                    secureReentry ? 'off' : 'on'
                  }`,
                },
              ]}
              testID="confirm-password"
            />
          </Form.Field>
        </>
      ) : (
        <>
          <Form.Field
            label={intl.formatMessage({
              id: ETranslations.auth_new_password_form_label,
            })}
            name="passCode"
            display={passCodeFirstStep ? 'flex' : 'none'}
            rules={{
              validate: {
                required: (v) =>
                  v
                    ? undefined
                    : intl.formatMessage({
                        id: ETranslations.auth_error_password_empty,
                      }),
                minLength: (v: string) =>
                  v.length >= PIN_CELL_COUNT
                    ? undefined
                    : intl.formatMessage(
                        { id: ETranslations.auth_error_password_too_short },
                        {
                          length: PIN_CELL_COUNT,
                        },
                      ),
                regexCheck: (v: string) =>
                  v.replace(PassCodeRegex, '') === v
                    ? undefined
                    : intl.formatMessage({
                        id: ETranslations.global_hex_data_error,
                      }),
              },
              onChange: () => {
                form.clearErrors();
              },
            }}
          >
            <PassCodeInput
              disabled={loading}
              onPinCodeChange={(pin) => {
                form.setValue('passCode', pin);
                form.clearErrors('passCode');
              }}
              testId="pass-code"
              showMask
            />
          </Form.Field>
          <Form.Field
            label={intl.formatMessage({
              id: ETranslations.auth_confirm_password_form_label,
            })}
            display={passCodeFirstStep ? 'none' : 'flex'}
            name="confirmPassCode"
            rules={{
              validate: {
                equal: (v, values) => {
                  if (passCodeFirstStep) {
                    return undefined;
                  }
                  const state = form.getFieldState('passCode');
                  if (!state.error) {
                    return v !== values.passCode
                      ? intl.formatMessage({
                          id: ETranslations.auth_error_password_not_match,
                        })
                      : undefined;
                  }
                  return undefined;
                },
              },
              onChange: () => {
                form.clearErrors('confirmPassCode');
              },
            }}
          >
            <PassCodeInput
              disabled={loading}
              onPinCodeChange={(pin) => {
                form.setValue('confirmPassCode', pin);
                form.clearErrors('confirmPassCode');
              }}
              testId="confirm-pass-code"
              showMask
            />
          </Form.Field>
        </>
      )}
      {!passCodeFirstStep ? (
        <Unspaced>{biologyAuthSwitchContainer}</Unspaced>
      ) : null}
      <Button
        size="large"
        $gtMd={
          {
            size: 'medium',
          } as any
        }
        variant="primary"
        loading={loading}
        onPress={form.handleSubmit(
          passCodeFirstStep ? onPassCodeNext : onSetupPassword,
        )}
        testID="set-password"
      >
        {confirmBtnTextMemo}
      </Button>
      {platformEnv.isNative ? (
        <Button
          size="large"
          variant="secondary"
          onPress={() => {
            form.reset();
            setCurrentPasswordMode(
              currentPasswordMode === EPasswordMode.PASSWORD
                ? EPasswordMode.PASSCODE
                : EPasswordMode.PASSWORD,
            );
          }}
        >
          {`切换成${
            currentPasswordMode === EPasswordMode.PASSWORD
              ? 'Passcode'
              : 'Password'
          }`}
        </Button>
      ) : null}
    </Form>
  );
};

export default memo(PasswordSetup);
