import React, { FC, useEffect, useState } from 'react';
import { overlayDisplayDuration } from '../../config/constants';
import OverlayLoader from './OverlayLoader';

interface overlayProps {
  showLoader?: boolean;
  message?: string;
  duration?: number;
  onOverlayHide?: () => void;
}

const Overlay: FC<overlayProps> = ({
  duration,
  message,
  showLoader,
  onOverlayHide,
}) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (duration === 0) {
      setShowOverlay(false);
    } else if (duration) {
      setTimeout(() => setShowOverlay(false), duration);
    } else {
      setTimeout(() => setShowOverlay(false), overlayDisplayDuration);
    }
  }, [duration]);

  useEffect(() => {
    if (!showOverlay) {
      onOverlayHide && onOverlayHide();
    }
  }, [showOverlay]);

  return showOverlay ? (
    <OverlayLoader message={message} showLoader={showLoader} />
  ) : null;
};

export default Overlay;
