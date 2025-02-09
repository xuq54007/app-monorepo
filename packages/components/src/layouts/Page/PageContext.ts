import type { MutableRefObject, RefObject } from 'react';
import { createContext } from 'react';

import type { IPageFooterProps } from './type';
import type { IScrollViewProps, IScrollViewRef } from '../ScrollView';
import type { NativeScrollPoint } from 'react-native';

export interface IPageFooterRef {
  props?: IPageFooterProps;
  notifyUpdate?: () => void;
}

export interface IPageContentOptions {
  safeAreaEnabled?: boolean;
  scrollEnabled?: boolean;
  footerRef: MutableRefObject<IPageFooterRef>;
  scrollProps?: Omit<IScrollViewProps, 'children'>;
  closeExtraRef?: MutableRefObject<{ flag?: string }>;
}

type IPageContentProps = IPageContentOptions;

export const PageContext = createContext<IPageContentProps>(
  {} as IPageContentProps,
);
