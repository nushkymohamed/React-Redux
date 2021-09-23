import React, { FC, useEffect } from 'react';
import { useMemo } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: any;
  transparent?: boolean;
  customClassName?: string;
  onClickAway?: any;
}

const Modal: FC<ModalProps> = ({
  children,
  transparent = false,
  customClassName = '',
  onClickAway = () => {},
}) => {
  const popupElement = useMemo(() => {
    return document.createElement('div');
  }, []);

  useEffect(() => {
    document.body.appendChild(popupElement);
    return () => {
      document.body.removeChild(popupElement);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`popup ${transparent ? 'transparent' : ''} ${customClassName}`}
    >
      <ClickAwayListener onClickAway={onClickAway}>
        <div className="popup--wrapper">{children}</div>
      </ClickAwayListener>
    </div>,
    popupElement
  );
};

export default Modal;
