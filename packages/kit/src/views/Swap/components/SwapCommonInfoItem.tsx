import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';

import {
  Icon,
  IconButton,
  Popover,
  SizableText,
  Skeleton,
  Stack,
  XStack,
} from '@onekeyhq/components';

interface ISwapCommonInfoItemProps {
  title: string;
  value?: string;
  valueComponent?: ReactNode;
  onPress?: () => void;
  questionMarkContent?: ReactNode;
  isLoading?: boolean;
}

const SwapCommonInfoItemTitleContent = ({
  title,
  questionMarkContent,
}: {
  title: string;
  questionMarkContent?: ReactNode;
}) => {
  const questionMarkComponent = useMemo(
    () => (
      <Popover
        title={title}
        renderTrigger={
          <IconButton
            variant="tertiary"
            size="small"
            icon="InfoCircleOutline"
          />
        }
        renderContent={<Stack>{questionMarkContent}</Stack>}
      />
    ),
    [questionMarkContent, title],
  );
  return (
    <XStack>
      <SizableText
        userSelect="none"
        mr="$1"
        size="$bodyMd"
        color="$textSubdued"
      >
        {title}
      </SizableText>
      {questionMarkContent ? questionMarkComponent : null}
    </XStack>
  );
};

const SwapCommonInfoItemTitleContentMemo = memo(SwapCommonInfoItemTitleContent);

const SwapCommonInfoItem = ({
  title,
  value,
  onPress,
  isLoading,
  valueComponent,
  questionMarkContent,
}: ISwapCommonInfoItemProps) => {
  const rightTrigger = useMemo(
    () => (
      <XStack
        userSelect="none"
        hoverStyle={{
          opacity: 0.5,
        }}
        alignItems="center"
        onPress={onPress}
        cursor={onPress ? 'pointer' : undefined}
      >
        {valueComponent || (
          <SizableText size="$bodyMdMedium">{value}</SizableText>
        )}
        {onPress ? (
          <Icon
            name="ChevronRightSmallOutline"
            mr="$-1"
            size="$5"
            color="$iconSubdued"
          />
        ) : null}
      </XStack>
    ),
    [onPress, value, valueComponent],
  );

  return (
    <XStack justifyContent="space-between" alignItems="center">
      <SwapCommonInfoItemTitleContentMemo
        title={title}
        questionMarkContent={questionMarkContent}
      />

      <XStack gap="$2">
        {isLoading ? (
          <Stack py="$1">
            <Skeleton h="$3" w="$24" />
          </Stack>
        ) : (
          rightTrigger
        )}
      </XStack>
    </XStack>
  );
};

export default memo(SwapCommonInfoItem);
