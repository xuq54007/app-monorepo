import { useLayoutEffect, useRef } from 'react';

export function TimeToFullDisplay({
  onDrawNextFrameView,
}: {
  onDrawNextFrameView: (params: {
    type: 'fullDisplay';
    newFrameTimestampInSeconds: number;
  }) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.onload = () => {
        onDrawNextFrameView({
          type: 'fullDisplay',
          newFrameTimestampInSeconds: Date.now(),
        });
      };
    }
  }, [onDrawNextFrameView]);
  return <div ref={ref} />;
}
