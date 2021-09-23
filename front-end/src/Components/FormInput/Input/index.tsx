import React, { FC } from 'react';

interface InputProps {
  Controller: any;
  [propName: string]: any;
  control: any;
  errorMessage?: string;
  inputClass?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  type: string;
  wrapperClass?: string;
  customOnchangeAction?: any;
}
const Input: FC<InputProps> = ({
  Controller,
  control,
  customOnchangeAction,
  errorMessage,
  inputClass = 'form-input',
  label,
  name,
  placeholder,
  required,
  rules,
  type,
  wrapperClass = 'form__form--field',
  ...rest
}) => {
  return (
    <div className={`${wrapperClass}`}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      {Controller ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ onChange, ref }: any) => (
            <input
              className={`${inputClass}`}
              type={`${type}`}
              placeholder={`${placeholder || ''}`}
              name={name}
              {...rest}
              onChange={e => {
                onChange(e.target.value);
                customOnchangeAction && customOnchangeAction(e);
              }}
            />
          )}
        />
      ) : (
        <input
          className={`${inputClass}`}
          type={`${type}`}
          placeholder={`${placeholder || ''}`}
          name={name}
          {...rest}
          onChange={e => {
            customOnchangeAction && customOnchangeAction(e);
          }}
        />
      )}
      {errorMessage?.length && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default Input;
