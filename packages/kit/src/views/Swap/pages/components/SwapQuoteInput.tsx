import { memo } from 'react';

import BigNumber from 'bignumber.js';

import { IconButton, YStack } from '@onekeyhq/components';
import { useSwapActions } from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import type { ESwapTabSwitchType } from '@onekeyhq/shared/types/swap/types';
import { ESwapDirectionType } from '@onekeyhq/shared/types/swap/types';

import {
  useSwapFromTokenAmount,
  useSwapQuoteCurrentSelect,
  useSwapQuoteEventFetching,
  useSwapQuoteLoading,
  useSwapSelectFromToken,
  useSwapSelectToToken,
  useSwapSelectTokenDetailFetching,
  useSwapSelectedFromTokenBalance,
  useSwapSelectedToTokenBalance,
} from '../../hooks/useSwapData';
import { validateAmountInput } from '../../utils/utils';

import SwapInputContainer from './SwapInputContainer';

interface ISwapQuoteInputProps {
  selectLoading?: boolean;
  onSelectToken: (type: ESwapDirectionType) => void;
  swapTabType: ESwapTabSwitchType;
}

const SwapQuoteInput = ({
  onSelectToken,
  selectLoading,
  swapTabType,
}: ISwapQuoteInputProps) => {
  const fromInputAmount = useSwapFromTokenAmount(swapTabType);
  const { swapActionsFromTokenAmount } = useSwapActions().current;
  const swapQuoteLoading = useSwapQuoteLoading(swapTabType);
  const quoteEventFetching = useSwapQuoteEventFetching(swapTabType);
  const fromToken = useSwapSelectFromToken(swapTabType);
  const toToken = useSwapSelectToToken(swapTabType);
  const swapTokenDetailLoading = useSwapSelectTokenDetailFetching(swapTabType);
  const { alternationToken } = useSwapActions().current;
  const swapQuoteCurrentSelect = useSwapQuoteCurrentSelect(swapTabType);
  const fromTokenBalance = useSwapSelectedFromTokenBalance(swapTabType);
  const toTokenBalance = useSwapSelectedToTokenBalance(swapTabType);

  return (
    <YStack>
      <SwapInputContainer
        token={fromToken}
        type={swapTabType}
        direction={ESwapDirectionType.FROM}
        selectTokenLoading={selectLoading}
        onAmountChange={(value) => {
          if (validateAmountInput(value, fromToken?.decimals)) {
            swapActionsFromTokenAmount(swapTabType, value);
          }
        }}
        amountValue={fromInputAmount}
        onBalanceMaxPress={() => {
          let maxAmount = fromTokenBalance;
          if (fromToken?.reservationValue) {
            const fromTokenBalanceBN = new BigNumber(fromTokenBalance ?? 0);
            const fromTokenReservationValueBN = new BigNumber(
              fromToken.reservationValue,
            );
            if (
              fromTokenBalanceBN
                .minus(fromTokenReservationValueBN)
                .isGreaterThan(0)
            ) {
              maxAmount = fromTokenBalanceBN
                .minus(fromTokenReservationValueBN)
                .toFixed();
            }
          }
          swapActionsFromTokenAmount(swapTabType, maxAmount);
        }}
        onSelectToken={onSelectToken}
        balance={fromTokenBalance}
      />
      <YStack pt="$3.5">
        <IconButton
          alignSelf="flex-end"
          icon="SwitchVerOutline"
          size="small"
          zIndex={2}
          disabled={swapTokenDetailLoading.from || swapTokenDetailLoading.to}
          onPress={() => {
            alternationToken(swapTabType);
          }}
          mb="$-3"
        />
        <SwapInputContainer
          token={toToken}
          type={swapTabType}
          inputLoading={swapQuoteLoading || quoteEventFetching}
          selectTokenLoading={selectLoading}
          direction={ESwapDirectionType.TO}
          amountValue={swapQuoteCurrentSelect?.toAmount ?? ''}
          onSelectToken={onSelectToken}
          balance={toTokenBalance}
        />
      </YStack>
    </YStack>
  );
};

export default memo(SwapQuoteInput);
