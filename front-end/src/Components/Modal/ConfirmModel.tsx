import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsExclamationCircleFill } from 'react-icons/bs';
import Modal from './Modal';

type PopupProps = {
  message?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModel: FC<PopupProps> = ({
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
  message = 'Are you sure ?',
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal>
      <div className="popup--content centerContent">
        <BsExclamationCircleFill className="icon color-green" />
        <h3>{t(message)}</h3>
        <div className="form__form--field buttons">
          <button
            onClick={onCancel}
            type="button"
            className="btn btn--secondary"
          >
            {t(cancelBtnText)}
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            onClick={onConfirm}
          >
            {t(confirmBtnText)}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModel;
