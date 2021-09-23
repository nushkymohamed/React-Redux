import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsExclamationCircleFill } from 'react-icons/bs';
import Modal from '../../Modal/Modal';

interface InformationalModal {
  modelCloseAction: Function;
  message: string;
  closeActionText: string;
}

const InformationalModal: FC<InformationalModal> = ({
  modelCloseAction,
  message,
  closeActionText,
}) => {
  const { t } = useTranslation();

  return (
    <Modal>
      <div className="popup--content centerContent">
        <BsExclamationCircleFill className="icon color-green" />
        <h3>{t(message)}</h3>
        <button onClick={() => modelCloseAction()} className="btn btn--primary">
          {t(closeActionText)}
        </button>
      </div>
    </Modal>
  );
};

export default InformationalModal;
