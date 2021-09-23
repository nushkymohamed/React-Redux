import React, { FC } from 'react';

interface TextareaInputProps {
  Controller: any;
  control: any;
  errorMessage?: string;
  inputClass?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  wrapperClass?: string;
  customOnchangeAction?: any;
  rows?: number;
}

const TextareaInput: FC<TextareaInputProps> = ({
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
  wrapperClass = 'form__form--field description-field',
  rows,
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
            <textarea
              className={`${inputClass}`}
              placeholder={`${placeholder || ''}`}
              name={name}
              rows={rows}
              onChange={e => {
                onChange(e.target.value);
                customOnchangeAction && customOnchangeAction();
              }}
              {...rest}
            />
          )}
        />
      ) : (
        <textarea
          className={`${inputClass}`}
          placeholder={`${placeholder || ''}`}
          name={name}
          rows={rows}
          onChange={e => {
            customOnchangeAction && customOnchangeAction();
          }}
          {...rest}
        />
      )}
      {errorMessage?.length && (
        <span className="error moveToBottom">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextareaInput;
