import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';
import Button from '../Button/Button';
import ButtonWithAnimation from '../ButtonWithAnimation/ButtonWithAnimation';
import Calendar from '../CalenderComponent';
import Clock from '../Clock';
import TimeSelect from '../TimeSelect';

interface propsType {
  getValue: Function;
  onClose: Function;
  onSubmit: Function;
  onSkip: Function;
  isLoading?:boolean;
}
const DateAndClock: FC<propsType> = ({
  onClose,
  getValue,
  onSubmit,
  onSkip,
  isLoading=false
}) => {
  const { t } = useTranslation();
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [isConfirmOrSkip, setIsConfirmOrSkip] = useState<
    'confirm' | 'skip' | ''
  >('');

  useEffect(() => {
    const timeNow: Date = new Date();
    timeNow.setHours(new Date().getHours() + 1);
    setReminderDate(timeNow);
  }, []);

  const convertTime12to24 = (time12h: any) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const getDateAndTime = (value: any, type: string) => {
    const dateAndTime = new Date(reminderDate);
    if (type === 'time') {
      const timeIn24 = convertTime12to24(
        `${value.hr}:${value.min} ${value.ampm}`
      );
      dateAndTime.setHours(+timeIn24.split(':')[0]);
      dateAndTime.setMinutes(+timeIn24.split(':')[1]);
    }
    if (type === 'date') {
      dateAndTime.setDate(value.getDate());
      dateAndTime.setMonth(value.getMonth());
      dateAndTime.setFullYear(value.getFullYear());
    }
    setReminderDate(dateAndTime);
    getValue(dateAndTime);
  };
  return (
    <div className="watchlater--popup">
      <a
        className="btn-close closemodale"
        aria-hidden="true"
        onClick={() => onClose()}
      >
        &times;
      </a>
      <div className="watchlater--popup__header">
        <h2>{t('Remind me later about this!')}</h2>
      </div>
      <div className="watchlater--popup__body">
        <div className="watchlater--popup__body--left">
          <Calendar
            selectDate={reminderDate}
            getDate={(d: Date) => getDateAndTime(d, 'date')}
          />
        </div>
        <div className="watchlater--popup__body--right">
          <div className="watchlater--popup__body--right-top">
            <Clock value={reminderDate} />
          </div>
          <div className="watchlater--popup__body--right-bottom">
            <TimeSelect
              selectedDateTime={reminderDate}
              getTime={(d: any) => getDateAndTime(d, 'time')}
            />
          </div>
        </div>
      </div>
      <div className="watchlater--popup__footer">
        {isLoading && isConfirmOrSkip === 'skip' ? (
          <ButtonWithAnimation
            animationClassName={'btn btn--secondary btn--loader active'}
            onTransitionEnd={() => {}}
          />
        ) : (
          <Button
            className="btn btn--secondary"
            onClick={() => {
              setIsConfirmOrSkip('skip');
              onSkip();
            }}
            type="button"
          >
            {t('Skip')}
          </Button>
        )}

        {isLoading && isConfirmOrSkip === 'confirm' ? (
          <ButtonWithAnimation
            animationClassName={'btn btn--primary btn--loader active'}
            onTransitionEnd={() => {}}
          />
        ) : (
          <Button
            className="btn btn--primary"
            onClick={() => {
              setIsConfirmOrSkip('confirm');
              onSubmit();
            }}
            type="button"
            disabled={new Date().getTime() > reminderDate.getTime()}
          >
            {t('Confirm')}
          </Button>
        )}
      </div>
    </div>
  );
};
export default DateAndClock;
