import { useEffect, useMemo } from 'react';

import { Stack } from '@onekeyhq/components';
import { generateUUID } from '@onekeyhq/shared/src/utils/miscUtils';

import type { ViewStyle } from 'react-native';
import type { WebViewProps } from 'react-native-webview';

export function WebView({
  tradingViewProps,
  style,
  onLoadEnd,
}: {
  tradingViewProps: {
    uri: string;
  };
  style: ViewStyle;
} & WebViewProps & {
    onLoadEnd: () => void;
  }) {
  const iframeId = useMemo(() => generateUUID(), []);
  useEffect(() => {
    const frame = document.getElementById(iframeId) as HTMLIFrameElement;
    if (frame && tradingViewProps.uri) {
      frame.onload = () => {
        setTimeout(() => {
          onLoadEnd();
        }, 800);
      };
    }
  }, [iframeId, onLoadEnd, tradingViewProps.uri]);
  return (
    <div style={{ ...(style as any), position: 'relative' }}>
      <iframe
        id={iframeId}
        src={tradingViewProps.uri}
        style={{
          height: '100%',
          width: '100%',
          border: 0,
        }}
        frameBorder="0"
        title="TradingView"
        sandbox="allow-orientation-lock allow-scripts	allow-top-navigation allow-top-navigation-by-user-activation allow-same-origin allow-popups"
      />
      <Stack
        position="absolute"
        width={42}
        height={20}
        bottom={40}
        left={10}
        bg="$bgApp"
      />
    </div>
  );
}
