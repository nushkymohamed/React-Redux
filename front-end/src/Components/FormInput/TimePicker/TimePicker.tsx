import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RCTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

interface TimePickerProps {
  label?: string;
  index: number;
  action: any;
  name: string;
}

const TimePicker: FC<TimePickerProps> = ({ label, index, action, name }) => {
  const { t } = useTranslation();

  const [time, setTime] = useState<any>(moment().startOf('date'));

  const updateTime = (t: moment.Moment) => {
    setTime(t);

    action(index, name, t.format('HH:mm:ss'));
  };

  return (
    <div className="time-picker">
      {label && <label>{t(label)}</label>}
      <div className="input-wrapper">
        <RCTimePicker
          showSecond
          format="HH:mm:ss"
          onChange={updateTime}
          value={time}
          allowEmpty={false}
          popupClassName="timepicker-custom-class"
        />
      </div>
    </div>
  );
};

export default TimePicker;
