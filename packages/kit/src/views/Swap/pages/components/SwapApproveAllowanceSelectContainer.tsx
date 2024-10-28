import { memo, useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { NumberSizeableText } from '@onekeyhq/components';
import { useSwapActions } from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import type {
  ESwapTabSwitchType,
  IAllowanceResult,
} from '@onekeyhq/shared/types/swap/types';
import { ESwapApproveAllowanceType } from '@onekeyhq/shared/types/swap/types';

import SwapApproveAllowanceSelect from '../../components/SwapApproveAllowanceSelect';
import { useSwapQuoteApproveAllowanceUnLimit } from '../../hooks/useSwapData';

interface ISwapApproveAllowanceSelectProps {
  allowanceResult: IAllowanceResult;
  fromTokenSymbol: string;
  isLoading?: boolean;
  type: ESwapTabSwitchType;
}

const SwapApproveAllowanceSelectContainer = ({
  allowanceResult,
  fromTokenSymbol,
  isLoading,
  type,
}: ISwapApproveAllowanceSelectProps) => {
  const intl = useIntl();

  const swapQuoteApproveAllowanceUnLimit =
    useSwapQuoteApproveAllowanceUnLimit(type);
  const {
    swapActionsApproveAllowanceSelectOpen,
    swapActionsQuoteApproveAllowanceUnLimit,
  } = useSwapActions().current;
  const approveAllowanceSelectItems = useMemo(
    () => [
      {
        label: (
          <NumberSizeableText
            size="$bodyMdMedium"
            formatter="balance"
            formatterOptions={{ tokenSymbol: fromTokenSymbol }}
          >
            {allowanceResult.amount}
          </NumberSizeableText>
        ) as unknown as string,
        value: ESwapApproveAllowanceType.PRECISION,
      },
      {
        label: intl.formatMessage({
          id: ETranslations.swap_page_provider_approve_amount_un_limit,
        }),
        value: ESwapApproveAllowanceType.UN_LIMIT,
      },
    ],
    [allowanceResult.amount, fromTokenSymbol, intl],
  );

  const onSelectAllowanceValue = useCallback(
    (value: string) => {
      swapActionsQuoteApproveAllowanceUnLimit(
        type,
        value === ESwapApproveAllowanceType.UN_LIMIT,
      );
    },
    [swapActionsQuoteApproveAllowanceUnLimit, type],
  );

  return (
    <SwapApproveAllowanceSelect
      currentSelectAllowanceValue={
        approveAllowanceSelectItems[swapQuoteApproveAllowanceUnLimit ? 1 : 0]
      }
      onSelectAllowanceValue={onSelectAllowanceValue}
      selectItems={approveAllowanceSelectItems}
      isLoading={isLoading}
      onSelectOpenChange={(open) => {
        swapActionsApproveAllowanceSelectOpen(type, open);
      }}
    />
  );
};

export default memo(SwapApproveAllowanceSelectContainer);
