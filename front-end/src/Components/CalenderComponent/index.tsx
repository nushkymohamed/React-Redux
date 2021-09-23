import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface propsType {
  getDate: Function;
  selectDate: Date;
}
const Calendar: FC<propsType> = ({ getDate, selectDate }) => {
  return (
    <DatePicker
      minDate={new Date()}
      selected={selectDate}
      onChange={(date: Date) => getDate(date)}
      inline
    />
  );
};
export default Calendar;
