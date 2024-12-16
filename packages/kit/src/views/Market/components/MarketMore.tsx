import { memo, useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import type { IActionListItemProps, IStackProps } from '@onekeyhq/components';
import { ActionList, IconButton } from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';

import { useReviewControl } from '../../../components/ReviewControl';

import { useLazyMarketTradeActions } from './tradeHook';
import { useWatchListAction } from './wachListHooks';

function BasicMarketMore({
  coingeckoId,
  symbol,
  showMoreAction,
  ...props
}: {
  coingeckoId: string;
  symbol: string;
  showMoreAction: boolean;
} & IStackProps) {
  const intl = useIntl();
  const actions = useWatchListAction();
  const MoveToTop = useCallback(() => {
    actions.MoveToTop(coingeckoId);
  }, [actions, coingeckoId]);
  const tradeActions = useLazyMarketTradeActions(coingeckoId);
  const show = useReviewControl();
  const sections = useMemo(
    () =>
      [
        showMoreAction && {
          items: [
            {
              icon: 'ArrowTopOutline',
              label: intl.formatMessage({
                id: ETranslations.market_move_to_top,
              }),
              onPress: MoveToTop,
            },
          ] as IActionListItemProps[],
        },
        show && {
          items: [
            {
              icon: 'MinusLargeSolid',
              label: intl.formatMessage({ id: ETranslations.global_sell }),
              onPress: tradeActions.onSell,
            },
          ] as IActionListItemProps[],
        },
      ].filter(Boolean),
    [MoveToTop, intl, show, showMoreAction, tradeActions.onSell],
  );
  return sections.length ? (
    <ActionList
      title=""
      renderTrigger={
        <IconButton
          title={intl.formatMessage({ id: ETranslations.global_more })}
          icon="DotVerSolid"
          variant="tertiary"
          iconSize="$5"
          {...props}
        />
      }
      sections={sections}
    />
  ) : null;
}

export const MarketMore = memo(BasicMarketMore);
