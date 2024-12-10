import { useState } from 'react';

import { StyleSheet, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { IconButton, XStack } from '@onekeyhq/components';

export const PIN_CELL_COUNT = 6;

const cellStyles = StyleSheet.create({
  cell: {
    flex: 1,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const PassCodeInput = ({
  onPinCodeChange,
  disabled,
}: {
  onPinCodeChange?: (pin: string) => void;
  disabled?: boolean;
}) => {
  const [pinValue, setPinValue] = useState('');

  const pinInputRef = useBlurOnFulfill({
    value: pinValue,
    cellCount: PIN_CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: pinValue,
    setValue: setPinValue,
  });
  const [enableMask, setEnableMask] = useState(true);
  const toggleMask = () => setEnableMask((f) => !f);
  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => {
    let textChild = null;
    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[cellStyles.cell, isFocused && cellStyles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };
  return (
    <XStack gap="$1" flex={1} disabled={disabled}>
      <CodeField
        autoFocus
        ref={pinInputRef}
        {...props}
        rootStyle={{ flex: 1 }}
        value={pinValue}
        onChangeText={(text) => {
          setPinValue(text);
          onPinCodeChange?.(text);
        }}
        cellCount={PIN_CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <IconButton
        icon={enableMask ? 'EyeOutline' : 'EyeOffOutline'}
        onPress={toggleMask}
      />
    </XStack>
  );
};

export default PassCodeInput;
