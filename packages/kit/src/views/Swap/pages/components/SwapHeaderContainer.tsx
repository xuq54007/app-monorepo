import { memo, useMemo, useRef } from 'react';

import { useIntl } from 'react-intl';

import type { ITabPageInstance } from '@onekeyhq/components';
import { Button, Tab, YStack } from '@onekeyhq/components';
import type { ITabPageType } from '@onekeyhq/components/src/layouts/TabView/StickyTabComponent/types';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import type { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

import SwapHeaderRightActionContainer from './SwapHeaderRightActionContainer';

interface ISwapHeaderContainerProps {
  defaultSwapType?: ESwapTabSwitchType;
  swapPage: ITabPageType;
  bridgePage: ITabPageType;
}

let tabIndex = 0;
const SwapHeaderContainer = ({
  defaultSwapType,
  swapPage,
  bridgePage,
}: ISwapHeaderContainerProps) => {
  const intl = useIntl();
  const headerRight = useMemo(() => <SwapHeaderRightActionContainer />, []);
  console.log('swap__defaultSwapType--', defaultSwapType);
  const ref = useRef<ITabPageInstance | null>(null);

  return (
    <YStack>
      <Button
        onPress={() => {
          // eslint-disable-next-line no-plusplus
          ++tabIndex;
          // eslint-disable-next-line no-bitwise
          ref.current?.scrollPageIndex(tabIndex & 1);
        }}
      >
        change tab index
      </Button>
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
        }}
        // onSelectedPageIndex={(index: number) => {
        //   // void swapTypeSwitchAction(
        //   //   index === 0 ? ESwapTabSwitchType.SWAP : ESwapTabSwitchType.BRIDGE,
        //   //   networkId,
        //   // );
        // }}
      />
    </YStack>
  );
};

export default memo(SwapHeaderContainer);
