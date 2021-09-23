import React, { FC, useEffect, useMemo } from 'react';
import CheckBox from '../FormInput/CheckBox/CheckBox';
import { pastPaperConstant } from '../../config/constants';
import { getMonths, getYears } from '../../Helper';
import { useTranslation } from 'react-i18next';
import DropdownInput from '../FormInput/DropdownInput';

interface PastPaperProps {
  Controller: any;
  control: any;
  errors: any;
  isPastPaper: boolean;
  unRegister: any;
  onClickPastPaper: any;
}

const PastPaper: FC<PastPaperProps> = ({
  Controller,
  control,
  errors,
  isPastPaper,
  unRegister,
  onClickPastPaper,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isPastPaper) return;
    unRegister(pastPaperConstant.month);
    unRegister(pastPaperConstant.year);
  }, [isPastPaper]);

  const generateYear = useMemo(() => {
    return getYears();
  }, []);

  const generateMonth = useMemo(() => {
    return getMonths();
  }, []);

  return (
    <div>
      <div className="form__form--field checkbox-wrapper">
        <CheckBox handleCheck={onClickPastPaper} isChecked={isPastPaper} />
        <label htmlFor="pass-paper"> {t('Past Paper')}</label>
      </div>
      {isPastPaper && (
        <div className="form__form--field">
          <DropdownInput
            name={'year'}
            label={t('Year')}
            placeholder={t('Select Year')}
            errorMessage={errors?.year?.message}
            Controller={Controller}
            control={control}
            options={generateYear}
            rules={{ required: t('Year cannot be empty') }}
          />

          <DropdownInput
            name={'month'}
            label={t('Month')}
            placeholder={t('Select Month')}
            errorMessage={errors?.month?.message}
            Controller={Controller}
            control={control}
            options={generateMonth}
            rules={{ required: t('Month cannot be empty') }}
          />
        </div>
      )}
    </div>
  );
};
export default PastPaper;
