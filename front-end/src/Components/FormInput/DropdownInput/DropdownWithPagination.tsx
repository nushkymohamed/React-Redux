import React, { FC, useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

interface DropdownWithPaginationProps {
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
  value?: any;
  isRequiredIconShow?: boolean;
  scrollCallBack?: Function;
  hideLabelText?: boolean;
  /** if this is true, lable is required unless maxTagCount > 0 */
  multiple?: boolean;
  showSearch?: boolean;
  size?: 'large' | 'middle' | 'small';
  /** if this is 0 in multiple mode, label is required */
  maxTagCount?: number;
}

const DropdownWithPagination: FC<DropdownWithPaginationProps> = ({
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
  scrollCallBack,
  hideLabelText,
  multiple,
  showSearch = false,
  size = 'small',
  maxTagCount = 0, //if this is 0 in multiple mode, label is required
  ...rest
}) => {
  const Option = Select.Option;

  const [inputValue, setInputValue] = useState<any>(null);

  const children = useMemo(() => {
    if (!options) {
      return [];
    }

    return options.map(({ value, label }, i) => {
      return (
        <Option key={i} value={value}>
          {label}
        </Option>
      );
    });
  }, [options]);

  useEffect(() => {
    setInputValue(value === '' ? null : value);
  }, [value]);

  const handleChange = (value: any) => {
    if (Array.isArray(value)) {
      value = value.filter(v => v); //filter out null/undefined values
    }
    customOnchangeAction && customOnchangeAction(value);
    setInputValue(value);
  };

  const onScroll = (event: any) => {
    var target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollCallBack && scrollCallBack();
    }
  };

  const multipleModeProps: {
    mode?: 'multiple' | 'tags' | undefined;
    maxTagCount?: number;
    maxTagPlaceholder?: string;
  } = useMemo(() => {
    if (!multiple) return {};

    return {
      mode: 'multiple',
      maxTagCount: maxTagCount,
      maxTagPlaceholder: label,
    };
  }, [multiple, label]);

  return (
    <div className={`${wrapperClass}  ${disabled ? 'disabled' : ''}`}>
      <label>
        {!hideLabelText && label}
        {required && isRequiredIconShow ? <span>*</span> : ''}
      </label>

      {Controller ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ onChange, ref }: any) => (
            <Select
              value={inputValue}
              className={`${inputClass} ${!hideLabelText && 'with_label'}`}
              placeholder={`${placeholder || ''}`}
              onChange={value => {
                onChange(value);
                handleChange(value);
              }}
              onPopupScroll={onScroll}
              disabled={disabled}
              bordered={false}
              showSearch={showSearch}
              size={size}
              {...multipleModeProps}
              allowClear
            >
              {children}
            </Select>
          )}
        />
      ) : (
        <Select
          value={inputValue}
          className={`${inputClass} ${!hideLabelText && 'with_label'}`}
          placeholder={`${placeholder || ''}`}
          onChange={handleChange}
          onPopupScroll={onScroll}
          disabled={disabled}
          bordered={false}
          showSearch={showSearch}
          size={size}
          {...multipleModeProps}
          allowClear
        >
          {children}
        </Select>
      )}

      {errorMessage?.length && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default DropdownWithPagination;
