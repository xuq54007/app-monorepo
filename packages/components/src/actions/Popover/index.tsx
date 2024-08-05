import type { ComponentType, ReactElement, ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useWindowDimensions } from 'react-native';
import { Popover as TMPopover, useMedia } from 'tamagui';

import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { FIX_SHEET_PROPS } from '../../composite';
import { Portal } from '../../hocs';
import {
  useBackHandler,
  useKeyboardHeight,
  useSafeAreaInsets,
} from '../../hooks';
import { SizableText, XStack } from '../../primitives';
import { NATIVE_HIT_SLOP } from '../../utils';
import { IconButton } from '../IconButton';
import { Trigger } from '../Trigger';

import { PopoverContent } from './PopoverContent';

import type { LayoutChangeEvent } from 'react-native';
import type {
  PopoverContentTypeProps,
  SheetProps,
  PopoverProps as TMPopoverProps,
} from 'tamagui';

export interface IPopoverProps extends TMPopoverProps {
  title: string;
  usingSheet?: boolean;
  renderTrigger: ReactNode;
  openPopover?: () => void;
  closePopover?: () => void;
  renderContent:
    | ReactElement
    | ComponentType<{ isOpen?: boolean; closePopover: () => void }>
    | null;
  floatingPanelProps?: PopoverContentTypeProps;
  sheetProps?: SheetProps;
}

interface IPopoverContext {
  closePopover?: () => Promise<void>;
}

const PopoverContext = createContext({} as IPopoverContext);

const usePopoverValue = (
  open?: boolean,
  onOpenChange?: IPopoverProps['onOpenChange'],
) => {
  const [isOpen, setIsOpen] = useState(false);
  const isControlled = typeof open !== 'undefined';
  const openPopover = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, [isControlled, onOpenChange]);
  const closePopover = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  }, [isControlled, onOpenChange]);
  return {
    ...(isControlled
      ? {
          isOpen: open,
          onOpenChange,
        }
      : {
          isOpen,
          onOpenChange: setIsOpen,
        }),
    openPopover,
    closePopover,
  };
};

const useContentDisplay = platformEnv.isNative
  ? () => undefined
  : (isOpen?: boolean, keepChildrenMounted?: boolean) => {
      const [display, setDisplay] = useState<'none' | undefined>(undefined);
      useEffect(() => {
        if (!keepChildrenMounted) {
          return;
        }
        if (isOpen) {
          setDisplay(undefined);
        } else {
          setTimeout(() => {
            setDisplay('none');
          }, 250);
        }
      }, [isOpen, keepChildrenMounted]);
      return display;
    };

export const usePopoverContext = () => {
  const { closePopover } = useContext(PopoverContext);
  return {
    closePopover,
  };
};

function RawPopover({
  title,
  open: isOpen,
  renderTrigger,
  renderContent,
  floatingPanelProps,
  sheetProps,
  onOpenChange,
  openPopover,
  closePopover,
  placement = 'bottom-end',
  usingSheet = true,
  allowFlip = true,
  ...props
}: IPopoverProps) {
  const { bottom } = useSafeAreaInsets();
  let transformOrigin;

  switch (placement) {
    case 'top':
      transformOrigin = 'bottom center';
      break;
    case 'bottom':
      transformOrigin = 'top center';
      break;
    case 'left':
      transformOrigin = 'right center';
      break;
    case 'right':
      transformOrigin = 'left center';
      break;
    case 'top-start':
      transformOrigin = 'bottom left';
      break;
    case 'top-end':
      transformOrigin = 'bottom right';
      break;
    case 'right-start':
      transformOrigin = 'top left';
      break;
    case 'bottom-start':
      transformOrigin = 'top left';
      break;
    case 'left-start':
      transformOrigin = 'top right';
      break;
    case 'left-end':
      transformOrigin = 'bottom right';
      break;
    default:
      transformOrigin = 'top right';
  }

  const handleClosePopover = useCallback(
    () =>
      new Promise<void>((resolve) => {
        closePopover?.();
        setTimeout(
          () => {
            resolve();
          },
          // Need to execute the callback after the sheet animation ends on the Native side
          platformEnv.isNative ? 300 : 0,
        );
      }),
    [closePopover],
  );

  const handleBackPress = useCallback(() => {
    if (!isOpen) {
      return false;
    }
    void handleClosePopover();
    return true;
  }, [handleClosePopover, isOpen]);

  useBackHandler(handleBackPress);

  const [maxScrollViewHeight, setMaxScrollViewHeight] = useState<
    number | undefined
  >(undefined);
  const { height: windowHeight } = useWindowDimensions();
  const handleLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      if (!platformEnv.isNative && !allowFlip) {
        const { top, height } = nativeEvent.layout as unknown as {
          top: number;
          height: number;
        };
        let contentHeight = 0;
        if (placement.startsWith('bottom')) {
          contentHeight = windowHeight - top - height - 20;
        } else if (placement.startsWith('top')) {
          contentHeight = top - 20;
        } else {
          contentHeight = windowHeight;
        }
        setMaxScrollViewHeight(Math.max(contentHeight, 0));
      }
    },
    [allowFlip, placement, windowHeight],
  );

  const RenderContent =
    typeof renderContent === 'function' ? renderContent : null;
  const popoverContextValue = useMemo(
    () => ({
      closePopover: handleClosePopover,
    }),
    [handleClosePopover],
  );
  const display = useContentDisplay(isOpen, props.keepChildrenMounted);
  const keyboardHeight = useKeyboardHeight();
  const content = (
    <PopoverContext.Provider value={popoverContextValue}>
      <PopoverContent isOpen={isOpen} closePopover={handleClosePopover}>
        {RenderContent
          ? ((
              <RenderContent
                isOpen={isOpen}
                closePopover={handleClosePopover}
              />
            ) as ReactElement)
          : (renderContent as ReactElement)}
      </PopoverContent>
    </PopoverContext.Provider>
  );
  return (
    <TMPopover
      offset={8}
      allowFlip={allowFlip}
      placement={placement}
      onOpenChange={onOpenChange}
      open={isOpen}
      {...props}
    >
      <TMPopover.Trigger asChild>
        <Trigger onLayout={handleLayout} onPress={openPopover}>
          {renderTrigger}
        </Trigger>
      </TMPopover.Trigger>
      {/* floating panel */}
      <TMPopover.Content
        unstyled
        outlineColor="$neutral3"
        outlineStyle="solid"
        outlineWidth="$px"
        display={display}
        style={{
          transformOrigin,
        }}
        enterStyle={{
          scale: 0.95,
          opacity: 0,
        }}
        exitStyle={{ scale: 0.95, opacity: 0 }}
        w="$96"
        bg="$bg"
        borderRadius="$3"
        elevation={20}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        {...floatingPanelProps}
      >
        <TMPopover.ScrollView
          testID="TMPopover-ScrollView"
          style={{ maxHeight: maxScrollViewHeight }}
        >
          {content}
        </TMPopover.ScrollView>
      </TMPopover.Content>
      {/* sheet */}
      {usingSheet ? (
        <TMPopover.Adapt when="md">
          <TMPopover.Sheet
            dismissOnSnapToBottom
            animation="quick"
            snapPointsMode="fit"
            {...sheetProps}
          >
            <TMPopover.Sheet.Overlay
              {...FIX_SHEET_PROPS}
              backgroundColor="$bgBackdrop"
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <TMPopover.Sheet.Frame unstyled paddingBottom={keyboardHeight}>
              {/* header */}
              <XStack
                borderTopLeftRadius="$6"
                borderTopRightRadius="$6"
                backgroundColor="$bg"
                marginHorizontal="$5"
                paddingHorizontal="$5"
                paddingVertical="$4"
                justifyContent="space-between"
                alignItems="center"
                borderCurve="continuous"
              >
                <SizableText size="$headingXl" color="$text">
                  {title}
                </SizableText>
                <IconButton
                  icon="CrossedSmallOutline"
                  size="small"
                  hitSlop={NATIVE_HIT_SLOP}
                  onPress={closePopover}
                  testID="popover-btn-close"
                />
              </XStack>

              {/* divider */}
              {/* <YStack
                backgroundColor="$bg"
                marginHorizontal="$5"
                paddingHorizontal="$5"
              >
                <Divider />
              </YStack> */}

              <TMPopover.Sheet.ScrollView
                borderBottomLeftRadius="$6"
                borderBottomRightRadius="$6"
                backgroundColor="$bg"
                showsVerticalScrollIndicator={false}
                marginHorizontal="$5"
                marginBottom={bottom || '$5'}
                borderCurve="continuous"
              >
                {content}
              </TMPopover.Sheet.ScrollView>
            </TMPopover.Sheet.Frame>
          </TMPopover.Sheet>
        </TMPopover.Adapt>
      ) : null}
    </TMPopover>
  );
}

const Popover = ({
  open,
  onOpenChange: onOpenChangeFunc,
  renderTrigger,
  sheetProps,
  ...rest
}: IPopoverProps) => {
  const { isOpen, onOpenChange, openPopover, closePopover } = usePopoverValue(
    open,
    onOpenChangeFunc,
  );
  const { md } = useMedia();
  const memoPopover = useMemo(
    () => (
      <RawPopover
        open={isOpen}
        onOpenChange={onOpenChange}
        openPopover={openPopover}
        closePopover={closePopover}
        renderTrigger={undefined}
        {...rest}
        sheetProps={sheetProps}
      />
    ),
    [closePopover, isOpen, onOpenChange, openPopover, rest, sheetProps],
  );
  if (platformEnv.isNative) {
    // on native and ipad, we add the popover to the RNScreen.FULL_WINDOW_OVERLAY
    return (
      <>
        <Trigger onPress={openPopover}>{renderTrigger}</Trigger>
        <Portal.Body container={Portal.Constant.FULL_WINDOW_OVERLAY_PORTAL}>
          {memoPopover}
        </Portal.Body>
      </>
    );
  }

  // on web, we add the popover into the RNRootView
  return (
    <RawPopover
      open={isOpen}
      // On the web platform of md size,
      //  the sheet needs to use the onOpenChange function to close the popover
      onOpenChange={md ? onOpenChange : undefined}
      openPopover={openPopover}
      closePopover={closePopover}
      sheetProps={{ ...sheetProps, modal: true }}
      renderTrigger={renderTrigger}
      {...rest}
    />
  );
};

Popover.Close = TMPopover.Close;

export { Popover };
