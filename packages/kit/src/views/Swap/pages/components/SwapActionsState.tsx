import { memo, useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import type { IKeyOfIcons } from '@onekeyhq/components';
import {
  Button,
  Dialog,
  EPageType,
  Icon,
  Page,
  Popover,
  SizableText,
  Stack,
  XStack,
  YStack,
  useMedia,
  usePageType,
} from '@onekeyhq/components';
import {
  useSwapActions,
  useSwapTypeSwitchAtom,
} from '@onekeyhq/kit/src/states/jotai/contexts/swap';
import { useSettingsPersistAtom } from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { openUrlExternal } from '@onekeyhq/shared/src/utils/openUrlUtils';
import { swapApproveResetValue } from '@onekeyhq/shared/types/swap/SwapProvider.constants';
import { ESwapDirectionType } from '@onekeyhq/shared/types/swap/types';

import {
  useSwapAddressInfo,
  useSwapRecipientAddressInfo,
} from '../../hooks/useSwapAccount';
import { useSwapBuildTx } from '../../hooks/useSwapBuiltTx';
import {
  useSwapFromTokenAmount,
  useSwapQuoteCurrentSelect,
  useSwapSelectFromToken,
  useSwapSelectToToken,
} from '../../hooks/useSwapData';
import { useSwapActionState } from '../../hooks/useSwapState';

const SwapActionsState = () => {
  const intl = useIntl();
  const [swapTabType] = useSwapTypeSwitchAtom();
  const fromToken = useSwapSelectFromToken(swapTabType);
  const toToken = useSwapSelectToToken(swapTabType);
  const fromAmount = useSwapFromTokenAmount(swapTabType);
  const currentQuoteRes = useSwapQuoteCurrentSelect(swapTabType);
  const swapFromAddressInfo = useSwapAddressInfo(ESwapDirectionType.FROM);
  const { cleanQuoteInterval, quoteAction } = useSwapActions().current;
  const swapActionState = useSwapActionState(swapTabType);
  const [{ swapEnableRecipientAddress }] = useSettingsPersistAtom();
  const swapRecipientAddressInfo = useSwapRecipientAddressInfo(
    swapEnableRecipientAddress,
  );
  const [{ swapBatchApproveAndSwap }] = useSettingsPersistAtom();
  const { buildTx, approveTx, wrappedTx } = useSwapBuildTx();

  const onBuildTx = useCallback(async () => {
    await buildTx();
  }, [buildTx]);

  const onApprove = useCallback(
    async (amount: string, isMax?: boolean, shoutResetApprove?: boolean) => {
      if (shoutResetApprove) {
        await approveTx(swapApproveResetValue, isMax, amount);
      } else {
        await approveTx(amount, isMax);
      }
    },
    [approveTx],
  );

  const onWrapped = useCallback(async () => {
    await wrappedTx();
  }, [wrappedTx]);

  const handleApprove = useCallback(() => {
    if (swapActionState.shoutResetApprove) {
      Dialog.confirm({
        onConfirmText: intl.formatMessage({
          id: ETranslations.global_continue,
        }),
        onConfirm: () => {
          void onApprove(fromAmount, swapActionState.approveUnLimit, true);
        },
        showCancelButton: true,
        title: intl.formatMessage({
          id: ETranslations.swap_page_provider_approve_usdt_dialog_title,
        }),
        description: intl.formatMessage({
          id: ETranslations.swap_page_provider_approve_usdt_dialog_content,
        }),
        icon: 'ErrorOutline',
      });
    } else {
      void onApprove(fromAmount, swapActionState.approveUnLimit);
    }
  }, [
    fromAmount,
    intl,
    onApprove,
    swapActionState.approveUnLimit,
    swapActionState.shoutResetApprove,
  ]);
  const pageType = usePageType();
  const { md } = useMedia();

  const onActionHandler = useCallback(() => {
    if (swapActionState.isRefreshQuote) {
      void quoteAction(
        swapTabType,
        swapFromAddressInfo?.address,
        swapFromAddressInfo?.accountInfo?.account?.id,
      );
    } else {
      cleanQuoteInterval();
      if (swapActionState.isApprove) {
        handleApprove();
        return;
      }

      if (swapActionState.isWrapped) {
        void onWrapped();
        return;
      }
      void onBuildTx();
    }
  }, [
    cleanQuoteInterval,
    handleApprove,
    onBuildTx,
    onWrapped,
    quoteAction,
    swapActionState.isApprove,
    swapActionState.isRefreshQuote,
    swapActionState.isWrapped,
    swapFromAddressInfo?.accountInfo?.account?.id,
    swapFromAddressInfo?.address,
    swapTabType,
  ]);

  const onActionHandlerBefore = useCallback(() => {
    if (!swapActionState.isRefreshQuote && currentQuoteRes?.quoteShowTip) {
      Dialog.confirm({
        onConfirmText: intl.formatMessage({
          id: ETranslations.global_continue,
        }),
        onConfirm: () => {
          onActionHandler();
        },
        title: currentQuoteRes?.quoteShowTip.title ?? '',
        description: currentQuoteRes.quoteShowTip.detail ?? '',
        icon:
          (currentQuoteRes?.quoteShowTip.icon as IKeyOfIcons) ??
          'ChecklistBoxOutline',
        renderContent: currentQuoteRes.quoteShowTip?.link ? (
          <Button
            variant="tertiary"
            size="small"
            alignSelf="flex-start"
            icon="QuestionmarkOutline"
            onPress={() => {
              if (currentQuoteRes.quoteShowTip?.link) {
                openUrlExternal(currentQuoteRes.quoteShowTip?.link);
              }
            }}
          >
            {intl.formatMessage({ id: ETranslations.global_learn_more })}
          </Button>
        ) : undefined,
      });
    } else {
      onActionHandler();
    }
  }, [
    currentQuoteRes?.quoteShowTip,
    intl,
    onActionHandler,
    swapActionState.isRefreshQuote,
  ]);

  const shouldShowRecipient = useMemo(
    () =>
      swapEnableRecipientAddress &&
      swapRecipientAddressInfo?.showAddress &&
      fromToken &&
      toToken &&
      currentQuoteRes?.toTokenInfo.networkId === toToken.networkId,
    [
      swapEnableRecipientAddress,
      currentQuoteRes?.toTokenInfo.networkId,
      fromToken,
      swapRecipientAddressInfo?.showAddress,
      toToken,
    ],
  );

  const approveStepComponent = useMemo(
    () =>
      swapActionState.isApprove && !swapBatchApproveAndSwap ? (
        <XStack
          gap="$1"
          {...(pageType === EPageType.modal && !md ? {} : { pb: '$5' })}
        >
          <Popover
            title={intl.formatMessage({ id: ETranslations.global_approve })}
            placement="top-start"
            renderContent={
              <SizableText
                size="$bodyLg"
                $gtMd={{
                  size: '$bodyMd',
                  pt: '$5',
                }}
                pb="$5"
                px="$5"
              >
                {intl.formatMessage({
                  id: ETranslations.swap_page_swap_steps_1_approve_dialog,
                })}
              </SizableText>
            }
            renderTrigger={
              <XStack
                userSelect="none"
                hoverStyle={{
                  opacity: 0.5,
                }}
              >
                <SizableText size="$bodyMdMedium" pr="$1">
                  {intl.formatMessage(
                    { id: ETranslations.swap_page_swap_steps_1 },
                    { tokenSymbol: fromToken?.symbol ?? '' },
                  )}
                </SizableText>
                <Icon
                  size="$5"
                  color="$iconSubdued"
                  name="QuestionmarkOutline"
                />
              </XStack>
            }
          />
          <Icon name="ArrowRightOutline" size="$5" color="$iconSubdued" />
          <SizableText size="$bodyMd" color="$textSubdued">
            {intl.formatMessage({
              id: ETranslations.swap_page_swap_steps_2,
            })}
          </SizableText>
        </XStack>
      ) : null,
    [
      swapActionState.isApprove,
      swapBatchApproveAndSwap,
      pageType,
      md,
      intl,
      fromToken?.symbol,
    ],
  );
  const recipientComponent = useMemo(() => {
    if (swapActionState.isApprove && !swapBatchApproveAndSwap) {
      return null;
    }
    if (shouldShowRecipient) {
      return (
        <XStack
          gap="$1"
          {...(pageType === EPageType.modal && !md
            ? { flex: 1 }
            : { pb: '$4' })}
        >
          <Stack>
            <Icon name="AddedPeopleOutline" w="$5" h="$5" />
          </Stack>
          <XStack flex={1} flexWrap="wrap" gap="$1">
            <SizableText flexShrink={0} size="$bodyMd" color="$textSubdued">
              {intl.formatMessage({
                id: ETranslations.swap_page_recipient_send_to,
              })}
            </SizableText>
            <SizableText flexShrink={0} size="$bodyMd">
              {swapRecipientAddressInfo?.showAddress}
            </SizableText>

            <SizableText
              numberOfLines={1}
              flexShrink={0}
              size="$bodyMd"
              color="$textSubdued"
            >
              {`(${
                !swapRecipientAddressInfo?.isExtAccount
                  ? `${
                      swapRecipientAddressInfo?.accountInfo?.walletName ?? ''
                    }-${
                      swapRecipientAddressInfo?.accountInfo?.accountName ?? ''
                    }`
                  : intl.formatMessage({
                      id: ETranslations.swap_page_recipient_external_account,
                    })
              })`}
            </SizableText>
          </XStack>
        </XStack>
      );
    }
    return null;
  }, [
    swapActionState.isApprove,
    swapBatchApproveAndSwap,
    shouldShowRecipient,
    pageType,
    md,
    intl,
    swapRecipientAddressInfo?.showAddress,
    swapRecipientAddressInfo?.accountInfo?.walletName,
    swapRecipientAddressInfo?.accountInfo?.accountName,
    swapRecipientAddressInfo?.isExtAccount,
  ]);

  const haveTips = useMemo(
    () =>
      shouldShowRecipient ||
      (swapActionState.isApprove && !swapBatchApproveAndSwap),
    [shouldShowRecipient, swapActionState.isApprove, swapBatchApproveAndSwap],
  );

  const actionComponent = useMemo(
    () => (
      <Stack
        flex={1}
        {...(pageType === EPageType.modal && !md
          ? {
              flexDirection: 'row',
              justifyContent: haveTips ? 'space-between' : 'flex-end',
              alignItems: 'center',
            }
          : {})}
      >
        {approveStepComponent}
        {recipientComponent}
        <Button
          onPress={onActionHandlerBefore}
          size={pageType === EPageType.modal && !md ? 'medium' : 'large'}
          variant="primary"
          disabled={swapActionState.disabled || swapActionState.isLoading}
          loading={swapActionState.isLoading}
        >
          {swapActionState.label}
        </Button>
      </Stack>
    ),
    [
      approveStepComponent,
      haveTips,
      md,
      onActionHandlerBefore,
      pageType,
      recipientComponent,
      swapActionState.disabled,
      swapActionState.isLoading,
      swapActionState.label,
    ],
  );

  return (
    <YStack p="$5">
      {pageType !== EPageType.modal && !md ? (
        actionComponent
      ) : (
        <Page.Footer
          {...(pageType === EPageType.modal && !md
            ? { buttonContainerProps: { flex: 1 } }
            : {})}
          confirmButton={actionComponent}
        />
      )}
    </YStack>
  );
};

export default memo(SwapActionsState);
