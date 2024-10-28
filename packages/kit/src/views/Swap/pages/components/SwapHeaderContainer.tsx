import { memo, useCallback } from 'react';

import { useIntl } from 'react-intl';

import { Tab } from '@onekeyhq/components';
import type { ITabPageType } from '@onekeyhq/components/src/layouts/TabView/StickyTabComponent/types';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import type { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';

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
  const headerRight = useCallback(() => <SwapHeaderRightActionContainer />, []);
  console.log('swap__defaultSwapType--', defaultSwapType);
  return (
    // <XStack justifyContent="space-between">
    <Tab.Page
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
      ListHeaderComponent={headerRight()}
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
      }}
      // onSelectedPageIndex={(index: number) => {
      //   // void swapTypeSwitchAction(
      //   //   index === 0 ? ESwapTabSwitchType.SWAP : ESwapTabSwitchType.BRIDGE,
      //   //   networkId,
      //   // );
      // }}
    />
    // {/* {headerRight()} */}
    // </XStack>
  );
};

export default memo(SwapHeaderContainer);
