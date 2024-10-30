import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useIntl } from 'react-intl';

import type { ITabPageInstance } from '@onekeyhq/components';
import { Tab, YStack } from '@onekeyhq/components';
import type { ITabPageType } from '@onekeyhq/components/src/layouts/TabView/StickyTabComponent/types';
import { useSwapActions } from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import {
  EAppEventBusNames,
  appEventBus,
} from '@onekeyhq/shared/src/eventBus/appEventBus';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

import SwapHeaderRightActionContainer from './SwapHeaderRightActionContainer';

interface ISwapHeaderContainerProps {
  defaultSwapType?: ESwapTabSwitchType;
  swapPage: ITabPageType;
  bridgePage: ITabPageType;
}

const SwapHeaderContainer = ({
  defaultSwapType,
  swapPage,
  bridgePage,
}: ISwapHeaderContainerProps) => {
  const intl = useIntl();
  const headerRight = useMemo(() => <SwapHeaderRightActionContainer />, []);
  const ref = useRef<ITabPageInstance | null>(null);
  const { swapActionsSwitchSwapType } = useSwapActions().current;
  const handleSwapTypeSwitch = useCallback(
    (event: { type: ESwapTabSwitchType }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      ref.current?.scrollPageIndex(
        event.type === ESwapTabSwitchType.BRIDGE ? 1 : 0,
      );
    },
    [],
  );
  useEffect(() => {
    appEventBus.off(EAppEventBusNames.SwapTypeSwitch, handleSwapTypeSwitch);
    appEventBus.on(EAppEventBusNames.SwapTypeSwitch, handleSwapTypeSwitch);
    return () => {
      appEventBus.off(EAppEventBusNames.SwapTypeSwitch, handleSwapTypeSwitch);
    };
  }, [handleSwapTypeSwitch]);

  useEffect(() => {
    if (defaultSwapType && defaultSwapType === ESwapTabSwitchType.BRIDGE) {
      void handleSwapTypeSwitch({ type: defaultSwapType });
    }
  }, [defaultSwapType, handleSwapTypeSwitch]);
  return (
    <YStack>
      <Tab.Page
        ref={ref}
        data={[
          {
            title: intl.formatMessage({ id: ETranslations.swap_page_swap }),
            page: swapPage,
          },
          {
            title: intl.formatMessage({ id: ETranslations.swap_page_bridge }),
            page: bridgePage,
          },
        ]}
        initialScrollIndex={0}
        headerProps={{
          style: {
            height: '$8',
            borderBottomWidth: 0,
          },
          itemContainerStyle: {
            px: '$2.5',
            mr: '$3',
            cursor: 'default',
          },
          itemTitleNormalStyle: {
            color: '$textSubdued',
            fontWeight: '600',
          },
          itemTitleSelectedStyle: { color: '$text' },
          cursorStyle: {
            height: '100%',
            bg: '$bgStrong',
            borderRadius: '$3',
            borderCurve: 'continuous',
          },
          headerRight,
          onSelectedPageIndex: (index) => {
            console.log('swap__onSelectedPageIndex', index);
            if (index === 0) {
              swapActionsSwitchSwapType(ESwapTabSwitchType.SWAP);
            } else {
              swapActionsSwitchSwapType(ESwapTabSwitchType.BRIDGE);
            }
          },
        }}
      />
    </YStack>
  );
};

export default memo(SwapHeaderContainer);
