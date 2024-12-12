import type { IStackProps } from '../../primitives';
import type { ReactVideoProps } from 'react-native-video';

export interface IVideoBufferConfig {
  cacheSizeMB?: number;
  bufferSize?: number;
  minBufferMs?: number;
  maxBufferMs?: number;
  playbackAfterBuffer?: number;
}

export type IVideoProps = ReactVideoProps &
  Omit<IStackProps, 'children'> & {
    autoPlay?: boolean;
  };
