import NativeVideo from 'react-native-video';
import { usePropsAndStyle } from 'tamagui';

import platformEnv from '@onekeyhq/shared/src/platformEnv';

import type { IVideoProps } from './type';
import type { ViewStyle } from 'react-native';

export function Video(rawProps: IVideoProps) {
  const [props, style] = usePropsAndStyle(rawProps);
  return (
    <NativeVideo
      style={style as ViewStyle}
      {...props}
      preferredForwardBufferDuration={
        platformEnv.isNativeIOS ? 30_000 : undefined
      }
      bufferConfig={{
        cacheSizeMB: platformEnv.isNativeAndroid ? 50_000 : undefined,
        minBufferMs: 15_000,
        maxBufferMs: 50_000,
        backBufferDurationMs: 30_000,
      }}
    />
  );
}

export { type IVideoProps } from './type';
export * from './enum';
