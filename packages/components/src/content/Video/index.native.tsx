import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import NativeVideo from 'react-native-video';
import { usePropsAndStyle } from 'tamagui';

import type { IVideoProps } from './type';
import type { ViewStyle } from 'react-native';

export function Video(rawProps: IVideoProps) {
  const [props, style] = usePropsAndStyle(rawProps);
  return (
    <NativeVideo
      style={style as ViewStyle}
      {...props}
      bufferConfig={{
        cacheSizeMB: Platform.OS === 'android' ? 50_000 : undefined,
        bufferSize: 10_000,
        minBufferMs: 15_000,
        maxBufferMs: 50_000,
        playbackAfterBuffer: 3000,
        ...props.bufferConfig,
      }}
    />
  );
}

Video.propTypes = {
  bufferConfig: PropTypes.shape({
    cacheSizeMB: PropTypes.number,
    bufferSize: PropTypes.number,
    minBufferMs: PropTypes.number,
    maxBufferMs: PropTypes.number,
    playbackAfterBuffer: PropTypes.number,
  }),
};

export { type IVideoProps } from './type';
export * from './enum';
