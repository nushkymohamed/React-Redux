import React, { FC, useState } from 'react';
import RCTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

interface TimePickerProps {
  label?: string;
  action: any;
  wrapperClass?: string;
  required?: boolean;
}

const TimePickerInput: FC<TimePickerProps> = ({
  label,
  action,
  wrapperClass = 'form__form--field',
  required,
}) => {

  const [time, setTime] = useState<any>(moment().startOf('date'));

  const updateTime = (t: moment.Moment) => {
    setTime(t);

    action(t.format('HH:mm:ss'));
  };

  return (
    <div className={`${wrapperClass}`}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>

      <div className="form-input timer">
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

export default TimePickerInput;
