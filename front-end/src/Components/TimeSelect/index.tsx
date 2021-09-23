import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface propsType {
  getTime: Function;
  selectedDateTime: Date;
}
interface timeType {
  hr: any;
  min: any;
  ampm: string;
}
const TimeSelect: FC<propsType> = ({ getTime, selectedDateTime }) => {
  const [defaultTime, setDefaultTime] = useState<timeType>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    setDefaultTime({
      hr: addZero(convertTime24To12(selectedDateTime).hours),
      min: addZero(convertTime24To12(selectedDateTime).minutes),
      ampm: convertTime24To12(selectedDateTime).ampm.toUpperCase(),
    });
  }, []);

  const addZero = (value: number) => {
    if (value < 10) return ('0' + value).slice(-2);
    return value;
  };

  const convertTime24To12 = (date: Date) => {
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    return { hours, minutes, ampm };
  };

  const onTimeChange = (value: string, name: string) => {
    let cloneTime: any = { ...defaultTime };
    switch (name) {
      case 'hr':
        if (+value <= 12 && +value > 0) {
          cloneTime[name] = addZero(+value);
        }
        break;
      case 'min':
        if (+value <= 59 && +value >= 0) {
          cloneTime[name] = addZero(+value);
        }
        break;
      case 'ampm':
        cloneTime[name] = value.toString();
        break;
    }
    timeValidation();
    setDefaultTime({ ...cloneTime });
    getTime(cloneTime);
  };

  const timeValidation = () => {
    const timeNow = new Date();
    if (timeNow.getTime() > selectedDateTime.getTime()) {
      setErrorMessage(t('You can not select past time'));
    } else {
      setErrorMessage('');
    }
  };
  useEffect(() => {
    selectedDateTime && timeValidation();
  }, [selectedDateTime]);

  return (
    <>
      <div className="watchlater--popup__body--timer">
        <input
          placeholder="1"
          type="number"
          min="1"
          max="12"
          name="hr"
          value={defaultTime?.hr}
          onChange={e => onTimeChange(e.target.value, e.target.name)}
        />
        <span>:</span>
        <input
          placeholder="00"
          type="number"
          min="0"
          max="59"
          name="min"
          value={defaultTime?.min}
          onChange={e => onTimeChange(e.target.value, e.target.name)}
        />
        <select
          value={defaultTime?.ampm}
          name="ampm"
          onChange={e => onTimeChange(e.target.value, e.target.name)}
          placeholder="AM"
        >
          <option value="AM">{t('AM')}</option>
          <option value="PM">{t('PM')}</option>
        </select>
      </div>
      <p className="error">{errorMessage}</p>
    </>
  );
};
export default TimeSelect;
