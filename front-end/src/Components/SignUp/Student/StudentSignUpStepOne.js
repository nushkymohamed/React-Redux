import React, { memo, useMemo, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-dropdown';

import Input from 'react-phone-number-input/input';
import 'react-datepicker/dist/react-datepicker.css';
import { emailRegex, nameRegex } from '../../../config/constants';
import ButtonWithAnimation from '../../ButtonWithAnimation/ButtonWithAnimation';

const StudentStepOne = ({
  goToNext,
  onSubmit,
  countries,
  goToPrevious,
  selectCountry,
  isUserExist,
  isUserExistLoading,
}) => {
  const { register, handleSubmit, errors, control, watch } = useForm({
    shouldFocusError: true,
  });
  const [country, setCountry] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(true);

  useEffect(() => {
    setShowErrorMessage(true);
  }, [isUserExist]);

  const { t } = useTranslation();
  const onFormSubmit = data => {
    onSubmit(data);
    goToNext(data.email);
  };

  const changeCountry = country => {
    setCountry(country.toUpperCase());
    selectCountry(country);
  };

  const generateCountries = useMemo(() => {
    if (!countries) return [];
    return countries.map(country => ({
      value: country.countryCode,
      label: country.name,
    }));
  }, [countries]);

  const [animationClassName, setAnimationClassName] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  useEffect(() => {
    if (!Object.keys(errors).length && isSubmitClick) {
      setLoadingAnimation(true);
      setAnimationClassName('btn btn--primary btn--loader active');
      setIsSubmitClick(false);
    }
  }, [errors]);

  useEffect(() => {
    if (!isUserExistLoading) {
      setLoadingAnimation(false);
      setAnimationClassName('');
    }
  }, [isUserExistLoading]);

  return (
    <div>
      <h3>{t('Basic Information')}</h3>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="form__form--field">
          <label>
            {t('First Name')}
            <span>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder={t('First Name')}
            ref={register({
              required: t('First name cannot be empty'),
              validate: value =>
                value.match(nameRegex) || t('Enter a valid name'),
            })}
            name="firstName"
            maxLength={100}
          />
          <span className="error">{errors.firstName?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Last Name')}
            <span>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder={t('Last Name')}
            ref={register({
              required: t('Last name cannot be empty'),
              validate: value =>
                value.match(nameRegex) || t('Enter a valid name'),
            })}
            name="lastName"
            maxLength={100}
          />
          <span className="error">{errors.lastName?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Date of Birth')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: t('Birthday cannot be empty') }}
            render={props => (
              <DatePicker
                maxDate={new Date()}
                className="form-input"
                placeholderText="dd/mm/yy"
                onChange={e => props.onChange(e)}
                selected={props.value}
                dateFormat="dd/MM/yy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            )}
          />
          <span className="error">{errors.dateOfBirth?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Email Address')}
            <span>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder={t('Your Email address')}
            ref={register({
              required: t('Email cannot be empty'),
              validate: {
                validFormat: value =>
                  value.match(emailRegex) || t('Invalid email address'),
              },
            })}
            onChange={() => setShowErrorMessage(false)}
            name="email"
            maxLength={255}
          />
          <span className="error">
            {isUserExist && showErrorMessage
              ? t('This email is already exist')
              : errors.email?.message}
          </span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Country')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="country"
            rules={{ required: t('Please select your country') }}
            render={props => (
              <Dropdown
                className="form-input"
                placeholder={t('Select the country')}
                onChange={({ value }) => {
                  changeCountry(value);
                  props.onChange(value);
                }}
                options={generateCountries}
              />
            )}
          />
          <span className="error">{errors.country?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Phone Number')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: true,
              minLength: 7,
            }}
            render={props => (
              <Input
                className="form-input"
                country={country}
                international
                withCountryCallingCode
                placeholder={t('Your phone number')}
                onChange={val => {
                  props.onChange(val);
                }}
              />
            )}
          />
          <span className="error">
            {errors.phone && t('Enter a valid phone number')}
          </span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Password')}
            <span>*</span>
          </label>
          <input
            className="form-input"
            type="password"
            placeholder={t('Your password should have at least 8 characters')}
            name="password"
            ref={register({
              required: t('Password cannot be empty'),
              validate: {
                uppercase: value =>
                  value.match(/[A-Z]/g) || t('Must have an uppercase letter'),
                lowercase: value =>
                  value.match(/[a-z]/g) || t('Must have a lowercase letter'),
                number: value =>
                  value.match(/[0-9]/g) || t('Must have a digit'),
                specialCharacters: value =>
                  value.match(/\W|_/g) || t('Must have a special character'),
                spaces: value =>
                  !value.match(/[\s]/g) ||
                  t('Password must not contain spaces'),
              },
              minLength: {
                value: 8,
                message: t('Password should contain at least 8 characters'),
              },
            })}
          />
          <span className="error">{errors.password?.message}</span>
        </div>

        <div className="form__form--field">
          <label> {t('Confirm Password')} </label>
          <input
            className="form-input"
            type="password"
            placeholder={t('Confirm Password')}
            name="confirmPassword"
            ref={register({
              validate: value =>
                value === watch('password') || t("Passwords don't match."),
            })}
          />
          <span className="error">{errors.confirmPassword?.message}</span>
        </div>

        <div className="form__form--field buttons">
          <button
            onClick={goToPrevious}
            type="button"
            className="btn btn--secondary"
          >
            {t('Back')}
          </button>

          {!loadingAnimation ? (
            <button
              type="submit"
              className="btn btn--primary btn--loader"
              onClick={() => setIsSubmitClick(true)}
            >
              {t('Next')}
            </button>
          ) : (
            <ButtonWithAnimation
              animationClassName={animationClassName}
              onTransitionEnd={setAnimationClassName}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default memo(StudentStepOne);
