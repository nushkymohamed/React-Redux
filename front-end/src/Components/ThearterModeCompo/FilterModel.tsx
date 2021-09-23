import React from 'react';
import DropdownInput from '../FormInput/DropdownInput';
import Input from '../FormInput/Input';
import Modal from '../Modal/Modal';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button';
import CustomDatePicker from '../CoreComponents/DatePicker/DatePicker';
import { BsJustify } from 'react-icons/bs';

const FilterModel = () => {
  const {
    handleSubmit: basicHandleSubmit,
    errors: basicErrors,
    control: basicControl,
    setValue: basicSetValue,
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      isEligibleForTrials: false,
    },
  });

  return (
    <Modal onClickAway={() => console.log('close')}>
      <div className="form">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <h4> Filter</h4>
          <h4> Close btn</h4>
        </div>
        <div className="form__form--field" style={{ background: 'white' }}>
          <CustomDatePicker
            className="form-input"
            errors={'Test ERROR'}
            onChange={(d: Date) => console.log(d)}
          />
        </div>
        <div className="createContent__column">
          <DropdownInput
            Controller={Controller}
            control={basicControl}
            errorMessage={'countryCode?.message'}
            label={'Country'}
            name="countryCode"
            placeholder="Select the Country"
            required
            options={dropDownData}
          />
        </div>

        <Input
          label={'First Name'}
          name={'firstName'}
          placeholder={'First Name'}
          Controller={Controller}
          control={basicControl}
          errorMessage={'errors?.firstName?.message'}
          maxLength={35}
          required
          type={'text'}
        />
        <Button type="button"> Filter </Button>
      </div>
    </Modal>
  );
};

export default FilterModel;

const dropDownData = [
  { value: '1', label: 'ddd' },
  { value: '2', label: 'ddd' },
];
