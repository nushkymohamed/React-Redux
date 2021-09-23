import React, { FC } from 'react';
import Dropdown from 'react-dropdown';

interface DropdownInputProps {
  Controller?: any;
  control?: any;
  errorMessage?: string;
  inputClass?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  wrapperClass?: string;
  options: { label: string; value: string }[];
  customOnchangeAction?: (arg0: string) => void;
  disabled?: boolean;
  value?: string;
  isRequiredIconShow?: boolean;
}

const DropdownInput: FC<DropdownInputProps> = ({
  Controller,
  control,
  errorMessage,
  inputClass = 'form-input',
  label,
  name,
  placeholder,
  required,
  rules,
  wrapperClass = 'form__form--field',
  options,
  customOnchangeAction,
  disabled,
  value,
  isRequiredIconShow = true,
  ...rest
}) => {
  return (
    <div className={`${wrapperClass}  ${disabled ? 'disabled' : ''}`}>
      <label>
        {label}
        {required && isRequiredIconShow ? <span>*</span> : ''}
      </label>

      {Controller ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ onChange, ref }: any) => (
            <Dropdown
              value={value || ''}
              disabled={disabled}
              className={`${inputClass}`}
              options={options}
              placeholder={`${placeholder || ''}`}
              onChange={({ value }) => {
                onChange(value);
                customOnchangeAction && customOnchangeAction(value);
              }}
              {...rest}
            />
          )}
        />
      ) : (
        <Dropdown
          value={value || ''}
          disabled={disabled}
          className={`${inputClass}`}
          options={options}
          placeholder={`${placeholder || ''}`}
          onChange={({ value }) => {
            customOnchangeAction && customOnchangeAction(value);
          }}
          {...rest}
        />
      )}
      {errorMessage?.length && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default DropdownInput;
