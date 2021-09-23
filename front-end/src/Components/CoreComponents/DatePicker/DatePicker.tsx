import React, { FC, forwardRef } from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

interface DatePickerProps {
  label?: string;
  onChange?: (D: Date) => void;
  className?: string;
  selected?: Date;
  dateFormat?: string;
  errors?: string;
  placeholderText?: string;
  isShowMonthDropDown?: boolean;
  isShowYearDropdown?: boolean;
  isShowTimeSelect?: boolean;
}

const CustomDatePicker: FC<DatePickerProps> = ({
  label = 'Date',
  onChange,
  className = 'form-input',
  selected = new Date(),
  dateFormat = 'dd/MM/yyyy',
  errors = null,
  placeholderText = 'Select date',
  isShowMonthDropDown = false,
  isShowYearDropdown = false,
  isShowTimeSelect = false,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(selected);
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div style={{ background: '#333' }} className={className}>
      <label>{label}</label>
      <div onClick={onClick} ref={ref}>
        {value}
        <>Add Icon here</>
      </div>
    </div>
  ));
  const onChangeDate = (e: Date) => {
    setSelectedDate(e);
    onChange && onChange(e);
  };

  return (
    <div style={{ height: 40, background: 'white' }}>
      <DatePicker
        placeholderText={placeholderText}
        onChange={(e: Date) => {
          onChangeDate(e);
        }}
        selected={selectedDate}
        dateFormat={dateFormat}
        showMonthDropdown={isShowMonthDropDown}
        showYearDropdown={isShowYearDropdown}
        showTimeSelect={isShowTimeSelect}
        dropdownMode="select"
        customInput={<CustomInput />}
        {...rest}
      />
      <span className="error">{errors}</span>
    </div>
  );
};

export default CustomDatePicker;