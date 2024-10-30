import { memo } from 'react';

import { useSwapTypeSwitchAtom } from '@onekeyhq/kit/src/states/jotai/contexts/swap';

import { useSwapFromAccountNetworkSync } from '../../hooks/useSwapAccount';
import { useSwapApproving } from '../../hooks/useSwapApproving';
import { useSwapQuote } from '../../hooks/useSwapQuote';

const SwapActionsLoop = () => {
  const [swapTabType] = useSwapTypeSwitchAtom();
  useSwapFromAccountNetworkSync(swapTabType);
  useSwapApproving(swapTabType);
  useSwapQuote(swapTabType);
  return null;
};

export default memo(SwapActionsLoop);
