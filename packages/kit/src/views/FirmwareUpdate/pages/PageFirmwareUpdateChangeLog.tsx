import { useMemo, useRef } from 'react';

import { Page } from '@onekeyhq/components';
import {
  EFirmwareUpdateSteps,
  useFirmwareUpdateStepInfoAtom,
} from '@onekeyhq/kit-bg/src/states/jotai/atoms';
import { toPlainErrorObject } from '@onekeyhq/shared/src/errors/utils/errorUtils';
import type {
  EModalFirmwareUpdateRoutes,
  IModalFirmwareUpdateParamList,
} from '@onekeyhq/shared/src/routes';
import type { ICheckAllFirmwareReleaseResult } from '@onekeyhq/shared/types/device';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import useAppNavigation from '../../../hooks/useAppNavigation';
import { useAppRoute } from '../../../hooks/useAppRoute';
import { usePromiseResult } from '../../../hooks/usePromiseResult';
import { FirmwareChangeLogView } from '../components/FirmwareChangeLogView';
import { FirmwareCheckingLoading } from '../components/FirmwareCheckingLoading';
import { FirmwareLatestVersionInstalled } from '../components/FirmwareLatestVersionInstalled';
import { FirmwareUpdateErrors } from '../components/FirmwareUpdateErrors';
import {
  FirmwareUpdateExitPrevent,
  ForceExtensionUpdatingFromExpandTab,
} from '../components/FirmwareUpdateExitPrevent';
import { FirmwareUpdatePageLayout } from '../components/FirmwareUpdatePageLayout';
import { FirmwareUpdateWarningMessage } from '../components/FirmwareUpdateWarningMessage';

function PageFirmwareUpdateChangeLog() {
  const route = useAppRoute<
    IModalFirmwareUpdateParamList,
    EModalFirmwareUpdateRoutes.ChangeLog
  >();
  const connectId = route?.params?.connectId;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useAppNavigation();
  const [stepInfo, setStepInfo] = useFirmwareUpdateStepInfoAtom();

  const confirmUpdateResult = useRef<
    ICheckAllFirmwareReleaseResult | undefined
  >();

  /*
     await backgroundApiProxy.serviceFirmwareUpdate.startFirmwareUpdateWorkflow(
              {
                backuped: true,
                usbConnected: true,
                connectId: firmwareUpdateInfo.connectId,
                updateFirmware: firmwareUpdateInfo,
                updateBle: bleUpdateInfo,
              },
            )

            */

  const { result, run, isLoading } = usePromiseResult(
    async () => {
      try {
        const r =
          await backgroundApiProxy.serviceFirmwareUpdate.checkAllFirmwareRelease(
            {
              connectId,
            },
          );
        if (r?.hasUpgrade) {
          setStepInfo({
            step: EFirmwareUpdateSteps.showChangeLog,
            payload: undefined,
          });
        } else {
          //
        }
        return r;
      } catch (error) {
        setStepInfo({
          step: EFirmwareUpdateSteps.error,
          payload: {
            error: toPlainErrorObject(error as any),
          },
        });
      }
    },
    [connectId, setStepInfo],
    {
      watchLoading: true,
    },
  );

  const content = useMemo(() => {
    // keep change log modal content when install modal back
    if (confirmUpdateResult.current) {
      return <FirmwareChangeLogView result={confirmUpdateResult.current} />;
    }
    if (isLoading) {
      return (
        <>
          <FirmwareUpdateExitPrevent />
          <FirmwareCheckingLoading connectId={connectId} />
        </>
      );
    }
    if (stepInfo.step === EFirmwareUpdateSteps.error) {
      return (
        <>
          <FirmwareUpdateWarningMessage />
          <FirmwareUpdateExitPrevent />
          <FirmwareUpdateErrors.WorkflowErrors
            error={stepInfo.payload.error}
            onRetry={run}
            result={result}
          />
        </>
      );
    }
    if (
      stepInfo.step === EFirmwareUpdateSteps.showChangeLog ||
      stepInfo.step === EFirmwareUpdateSteps.showCheckList
    ) {
      return (
        <FirmwareChangeLogView
          result={result}
          onConfirmClick={() => {
            confirmUpdateResult.current = result;
          }}
        />
      );
    }
    return <FirmwareLatestVersionInstalled />;
  }, [connectId, isLoading, result, run, stepInfo.payload, stepInfo.step]);

  return (
    <Page
      scrollEnabled
      onUnmounted={async () => {
        console.log('PageFirmwareUpdateChangeLog unmounted');
        await backgroundApiProxy.serviceFirmwareUpdate.exitUpdateWorkflow();
      }}
    >
      <FirmwareUpdatePageLayout>
        <ForceExtensionUpdatingFromExpandTab />
        {content}
      </FirmwareUpdatePageLayout>
    </Page>
  );
}

// PageFirmwareUpdateBootloaderMode
// PageFirmwareUpdateChangeLog
export default PageFirmwareUpdateChangeLog;
