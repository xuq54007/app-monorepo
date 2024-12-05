import assert from 'assert';

import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
} from 'lodash';

import errorUtils from '../errors/utils/errorUtils';
import platformEnv from '../platformEnv';
import appStorage from '../storage/appStorage';
import { EAppSyncStorageKeys } from '../storage/syncStorage';

import { isPromiseObject } from './promiseUtils';
import timerUtils from './timerUtils';

type IErrorType = undefined | string | Error;

export { assert };

export const check = (statement: any, orError?: IErrorType) => {
  if (!statement) {
    // eslint-disable-next-line no-param-reassign
    orError = orError || 'Invalid statement';
    // eslint-disable-next-line no-param-reassign
    orError = orError instanceof Error ? orError : new Error(orError);

    throw orError;
  }
};
export const checkIsDefined = <T>(something?: T, orError?: IErrorType): T => {
  check(
    typeof something !== 'undefined',
    orError || 'Expect defined but actually undefined',
  );
  return something as T;
};

export const checkIsUndefined = (something: any, orError?: IErrorType) => {
  check(
    typeof something === 'undefined',
    orError || `Expect undefined but actually ${something as string}`,
  );
};

export function throwCrossError(msg: string, ...args: any) {
  if (platformEnv.isNative) {
    // `throw new Error()` won't print error object in iOS/Android,
    //    so we print it manually by `console.error()`
    console.error(msg, ...args);
  }
  throw new Error(msg);
}

export function isSerializable(obj: any, keyPath?: string[]) {
  if (
    isUndefined(obj) ||
    isNull(obj) ||
    isBoolean(obj) ||
    isNumber(obj) ||
    isString(obj) ||
    obj instanceof Error
  ) {
    return true;
  }

  if (!isPlainObject(obj) && !isArray(obj)) {
    // like regex, date
    console.log(
      'isSerializable false >>>>>> : ',
      'keyPath',
      keyPath,
      'obj',
      obj,
      {
        isPlainObject: isPlainObject(obj),
        isArray: isArray(obj),
        isArray2: Array.isArray(obj),
        typeofInfo: typeof obj,
        length: (obj as { length?: number } | undefined)?.length,
      },
    );
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!isSerializable(obj[key], [...(keyPath || []), key])) {
      return false;
    }
  }

  return true;
}

type ISerializableCheckingDisabledConfig = {
  disabled: boolean | undefined;
  updateAt: number;
};

export function toggleBgApiSerializableChecking(enabled: boolean) {
  const data: ISerializableCheckingDisabledConfig = {
    disabled: !enabled,
    updateAt: Date.now(),
  };
  appStorage.syncStorage.setObject(
    EAppSyncStorageKeys.onekey_disable_bg_api_serializable_checking,
    data,
  );
}
export function isBgApiSerializableCheckingDisabled() {
  try {
    const data =
      appStorage.syncStorage.getObject<ISerializableCheckingDisabledConfig>(
        EAppSyncStorageKeys.onekey_disable_bg_api_serializable_checking,
      );
    if (!data) {
      return false;
    }
    if (
      data.updateAt &&
      Date.now() - data.updateAt >
        timerUtils.getTimeDurationMs({
          day: 1,
        })
    ) {
      // 1 day
      return false;
    }
    return Boolean(data.disabled);
  } catch (error) {
    errorUtils.autoPrintErrorIgnore(error);
    return false;
  }
}
export function ensureSerializable(
  obj: any,
  stringify = false,
  info?: any,
): any {
  if (process.env.NODE_ENV !== 'production') {
    if (!isBgApiSerializableCheckingDisabled()) {
      if (!isSerializable(obj)) {
        console.error('Object should be serializable >>>> ', obj, info);
        if (stringify) {
          return JSON.parse(
            // stringUtils.safeStringify(obj),
            JSON.stringify(obj),
          );
        }

        throw new Error('Object should be serializable');
      }
    }
  }
  return obj;
}

export function ensurePromiseObject(
  obj: any,
  {
    serviceName,
    methodName,
  }: {
    serviceName: string;
    methodName: string;
  },
) {
  if (process.env.NODE_ENV !== 'production') {
    // if (obj !== undefined && !(obj instanceof Promise)) {
    if (!isPromiseObject(obj)) {
      throwCrossError(
        `${
          serviceName ? `${serviceName}.` : ''
        }${methodName}() should be async or Promise method.`,
      );
    }
  }
}

export function ensureRunOnBackground() {
  // eslint-disable-next-line import/no-named-as-default-member
  if (!platformEnv.isJest && platformEnv.isExtensionUi) {
    throw new Error('this code can not run on UI');
  }
}

export function ensureRunOnNative() {
  if (!platformEnv.isJest && !platformEnv.isNative) {
    throw new Error('this code can not run on non-native');
  }
}
