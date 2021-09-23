import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import { FaCheck } from 'react-icons/fa';

interface SpecialPriceModalProps {
  onClickAway: Function;
  currentPrice: string;
  setBulkSpecialPrice: Function;
  popupTitle?: string;
}

const SpecialPriceModal: FC<SpecialPriceModalProps> = ({
  onClickAway,
  currentPrice,
  setBulkSpecialPrice,
  popupTitle = 'Set Special Price',
}) => {
  const { t } = useTranslation();
  const [specialPrice, setSpecialPrice] = useState(currentPrice);
  const inputRef = useRef<any>();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <Modal onClickAway={onClickAway} customClassName={'specialPrice'}>
      <div className="popup--content">
        <h4>{t(popupTitle)}</h4>
        <div className="specialPrice--input">
          <input
            type="text"
            value={specialPrice}
            className="form-input input-no-title"
            onChange={e =>
              e.target.validity.valid && setSpecialPrice(e.target.value)
            }
            pattern="^\d+(\.\d{0,2})?$"
            ref={inputRef}
          />
          <button
            type="button"
            onClick={() => {
              setBulkSpecialPrice(specialPrice);
              onClickAway();
            }}
          >
            <FaCheck className="icon color-white verySmall-icon" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SpecialPriceModal;
