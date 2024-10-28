import { memo, useMemo } from 'react';

import BigNumber from 'bignumber.js';

import { SizableText, YStack } from '@onekeyhq/components';
import { AmountInput } from '@onekeyhq/kit/src/components/AmountInput';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import accountUtils from '@onekeyhq/shared/src/utils/accountUtils';
import type {
  ESwapTabSwitchType,
  ISwapToken,
} from '@onekeyhq/shared/types/swap/types';
import {
  ESwapDirectionType,
  ESwapRateDifferenceUnit,
} from '@onekeyhq/shared/types/swap/types';

import { useSwapAddressInfo } from '../../hooks/useSwapAccount';
import { useRateDifference, useSwapAlerts } from '../../hooks/useSwapData';
import { useSwapSelectedTokenInfo } from '../../hooks/useSwapTokens';

import SwapAccountAddressContainer from './SwapAccountAddressContainer';

interface ISwapInputContainerProps {
  direction: ESwapDirectionType;
  type: ESwapTabSwitchType;
  token?: ISwapToken;
  onAmountChange?: (value: string) => void;
  amountValue: string;
  onSelectToken: (type: ESwapDirectionType) => void;
  balance: string;
  address?: string;
  inputLoading?: boolean;
  selectTokenLoading?: boolean;
  onBalanceMaxPress?: () => void;
}

const SwapInputContainer = ({
  onAmountChange,
  direction,
  token,
  amountValue,
  selectTokenLoading,
  inputLoading,
  onSelectToken,
  onBalanceMaxPress,
  balance,
  type,
}: ISwapInputContainerProps) => {
  useSwapSelectedTokenInfo({
    token,
    swapType: type,
    directionType: direction,
  });
  const [settingsPersistAtom] = useSettingsPersistAtom();
  const alerts = useSwapAlerts(type);
  const { address, accountInfo } = useSwapAddressInfo(direction);
  const rateDifference = useRateDifference(type);
  const amountPrice = useMemo(() => {
    if (!token?.price) return '0.0';
    const tokenPriceBN = new BigNumber(token.price ?? 0);
    const tokenFiatValueBN = new BigNumber(amountValue ?? 0).multipliedBy(
      tokenPriceBN,
    );
    return tokenFiatValueBN.isNaN()
      ? '0.0'
      : `${tokenFiatValueBN.decimalPlaces(6, BigNumber.ROUND_DOWN).toFixed()}`;
  }, [amountValue, token?.price]);

  const fromInputHasError = useMemo(
    () =>
      (alerts?.states.some((item) => item.inputShowError) &&
        direction === ESwapDirectionType.FROM) ||
      (!address &&
        (accountUtils.isHdWallet({ walletId: accountInfo?.wallet?.id }) ||
          accountUtils.isHwWallet({ walletId: accountInfo?.wallet?.id }) ||
          accountUtils.isQrWallet({ walletId: accountInfo?.wallet?.id }))),
    [alerts?.states, direction, address, accountInfo],
  );

  const valueMoreComponent = useMemo(() => {
    if (rateDifference && direction === ESwapDirectionType.TO) {
      let color = '$textSubdued';
      if (inputLoading) {
        color = '$textPlaceholder';
      }
      if (rateDifference.unit === ESwapRateDifferenceUnit.NEGATIVE) {
        color = '$textCritical';
      }
      if (rateDifference.unit === ESwapRateDifferenceUnit.POSITIVE) {
        color = '$textSuccess';
      }
      return (
        <SizableText size="$bodyMd" color={color}>
          {rateDifference.value}
        </SizableText>
      );
    }
    return null;
  }, [direction, inputLoading, rateDifference]);

  return (
    <YStack>
      <SwapAccountAddressContainer
        direction={direction}
        type={type}
        onClickNetwork={onSelectToken}
      />
      <AmountInput
        onChange={onAmountChange}
        value={amountValue}
        hasError={fromInputHasError}
        balanceProps={{
          value: balance,
          onPress: onBalanceMaxPress,
        }}
        valueProps={{
          value: amountPrice,
          color:
            inputLoading && direction === ESwapDirectionType.TO
              ? '$textPlaceholder'
              : undefined,
          currency: settingsPersistAtom.currencyInfo.symbol,
          moreComponent: valueMoreComponent,
        }}
        inputProps={{
          placeholder: '0.0',
          readOnly: direction === ESwapDirectionType.TO,
          color:
            direction === ESwapDirectionType.TO && inputLoading
              ? '$textPlaceholder'
              : undefined,
          style:
            !platformEnv.isNative && direction === ESwapDirectionType.TO
              ? ({
                  caretColor: 'transparent',
                } as any)
              : undefined,
        }}
        tokenSelectorTriggerProps={{
          loading: selectTokenLoading,
          selectedNetworkImageUri: token?.networkLogoURI,
          selectedTokenImageUri: token?.logoURI,
          selectedTokenSymbol: token?.symbol,
          onPress: () => {
            onSelectToken(direction);
          },
        }}
        enableMaxAmount={direction === ESwapDirectionType.FROM}
      />
    </YStack>
  );
};

export default memo(SwapInputContainer);
