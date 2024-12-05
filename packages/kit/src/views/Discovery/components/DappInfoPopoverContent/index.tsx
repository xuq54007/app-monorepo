import { upperFirst } from 'lodash';
import { useIntl } from 'react-intl';
import { StyleSheet } from 'react-native';

import type { IBadgeType } from '@onekeyhq/components';
import {
  Badge,
  Dialog,
  Icon,
  Image,
  SizableText,
  Skeleton,
  Stack,
  XStack,
  YStack,
} from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { formatDistanceToNow } from '@onekeyhq/shared/src/utils/dateUtils';
import type { IHostSecurity } from '@onekeyhq/shared/types/discovery';
import { EHostSecurityLevel } from '@onekeyhq/shared/types/discovery';

import { DAppRiskyAlertDetail } from '../../../DAppConnection/components/DAppRequestLayout/DAppRiskyAlertDetail';

export function DappInfoPopoverContent({
  hostSecurity,
  closePopover,
}: {
  hostSecurity?: IHostSecurity;
  closePopover: () => void;
}) {
  const intl = useIntl();
  const tags: {
    type: IBadgeType;
    name: string;
  }[] = [];
  const description = '';
  return (
    <YStack
      gap="$5"
      p="$5"
      onPress={(e) => {
        e.stopPropagation();
      }}
    >
      <XStack group="card" alignItems="center" userSelect="none">
        <Image
          w="$10"
          h="$10"
          borderRadius="$2"
          borderWidth={StyleSheet.hairlineWidth}
          borderColor="$borderSubdued"
          borderCurve="continuous"
        >
          <Image.Source
            source={{
              uri: 'item.logo',
            }}
          />
          <Image.Fallback>
            <Icon name="GlobusOutline" width="100%" height="100%" />
          </Image.Fallback>
          <Image.Loading>
            <Skeleton width="100%" height="100%" />
          </Image.Loading>
        </Image>
        <Stack flex={1} ml="$3">
          <XStack alignItems="center">
            <SizableText
              size="$bodyLgMedium"
              $gtMd={{
                size: '$bodyMdMedium',
              }}
              numberOfLines={1}
            >
              {hostSecurity?.projectName ?? ''}
            </SizableText>
            {tags.length ? (
              <Badge badgeSize="sm" badgeType={tags[0].type} ml="$2">
                {tags[0].name}
              </Badge>
            ) : null}
          </XStack>
          <SizableText
            size="$bodyMd"
            color="$textSubdued"
            numberOfLines={1}
            $gtMd={
              {
                size: '$bodySm',
                numberOfLines: 2,
                whiteSpace: 'break-spaces',
              } as any
            }
          >
            {description}
          </SizableText>
        </Stack>
      </XStack>
      <YStack gap="$3">
        <SizableText size="$headingMd">
          {intl.formatMessage({
            id: ETranslations.browser_risk_detection,
          })}
        </SizableText>
        <XStack ai="center">
          <Icon name="BadgeVerifiedSolid" color="$iconSuccess" />
          <Stack ml="$3" flex={1}>
            <SizableText size="$bodyMdMedium">
              {intl.formatMessage({
                id: ETranslations.dapp_connect_verified_site,
              })}
            </SizableText>
            <SizableText size="$bodyMd">
              {intl.formatMessage(
                {
                  id: ETranslations.global_from_provider,
                },
                {
                  provider:
                    hostSecurity?.checkSources
                      .filter(
                        (item) =>
                          item.riskLevel === EHostSecurityLevel.Security,
                      )
                      .map((item) => item.name)
                      .join(' & ') || '',
                },
              )}
            </SizableText>
          </Stack>
          <XStack
            ai="center"
            onPress={() => {
              closePopover();
              Dialog.show({
                title: hostSecurity?.host,
                renderContent: (
                  <DAppRiskyAlertDetail urlSecurityInfo={hostSecurity} />
                ),
                showFooter: false,
              });
            }}
          >
            <SizableText size="$bodyMdMedium">
              {intl.formatMessage({
                id: ETranslations.global_details,
              })}
            </SizableText>
            <Icon name="ChevronRightSmallOutline" color="$iconSubdued" />
          </XStack>
        </XStack>
      </YStack>
      {hostSecurity?.checkSources ? (
        <YStack>
          <SizableText size="$headingMd">
            {intl.formatMessage({
              id: ETranslations.browser_dapp_listed_by,
            })}
          </SizableText>
          <XStack gap="$2" pt="$3" flexWrap="wrap">
            {hostSecurity.checkSources
              .filter((item) => item.riskLevel !== EHostSecurityLevel.Unknown)
              .map((item) => (
                <XStack
                  key={item.name}
                  gap="$1"
                  px="$2"
                  py="$1"
                  bg="$bgSubdued"
                  borderRadius="$2"
                  borderColor="$borderSubdued"
                  borderWidth={StyleSheet.hairlineWidth}
                >
                  <Image w="$5" h="$5" bg="$bgSubdued" borderRadius="$1">
                    <Image.Source
                      source={{
                        uri: `https://uni.onekey-asset.com/static/logo/${item.name}.png`,
                      }}
                    />
                    <Image.Fallback>
                      <Icon
                        size="$5"
                        name="GlobusOutline"
                        color="$iconSubdued"
                      />
                    </Image.Fallback>
                    <Image.Loading>
                      <Skeleton width="100%" height="100%" />
                    </Image.Loading>
                  </Image>
                  <SizableText size="$bodyMdMedium">
                    {upperFirst(item.name)}
                  </SizableText>
                </XStack>
              ))}
          </XStack>
          {hostSecurity.updatedAt ? (
            <SizableText mt="$2" color="$textSubdued" size="$bodyMd">
              {`Last verified at ${formatDistanceToNow(
                new Date(hostSecurity.updatedAt),
              )}`}
            </SizableText>
          ) : null}
        </YStack>
      ) : null}
    </YStack>
  );
}
