import React, { useState, useEffect, useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { emailRegex, nameRegex } from '../../../config/constants';
import { CommonTypes } from '../../../redux/common/commonReducer';
import DropdownInput from '../../FormInput/DropdownInput';
import Input from '../../FormInput/Input';

interface BasicInformationType {
  Controller: any;
  control: any;
  countries: CommonTypes['countries'];
  errors: any;
  isUserExist: boolean | null;
  register: any;
  setValue: any;
}

const BasicInformation: FC<BasicInformationType> = ({
  Controller,
  control,
  countries,
  errors,
  isUserExist,
  register,
  setValue,
}) => {
  const { t } = useTranslation();

  const [showErrorMessage, setShowErrorMessage] = useState(true);

  useEffect(() => {
    setShowErrorMessage(true);
  }, [isUserExist]);

  const generateCountries = useMemo(() => {
    if (!countries) return [];
    return countries.map((country: { countryCode: string; name: string }) => ({
      value: country.countryCode,
      label: country.name,
    }));
  }, [countries]);

  return (
    <div className="createContent__row basic-info">
      <div className="createContent__column">
        <h3 className="createContent__rowtitle">{t('Basic Information')}</h3>
        <div className="form">
          <Input
            Controller={Controller}
            control={control}
            errorMessage={errors?.firstName?.message}
            label={t('First Name')}
            maxLength={35}
            name={'firstName'}
            placeholder={t('First Name')}
            required
            type={'text'}
            rules={{
              required: t('First name cannot be empty'),
              validate: (value: string) =>
                value.match(nameRegex) || t('Enter a valid name'),
            }}
          />

          <Input
            Controller={Controller}
            control={control}
            errorMessage={
              isUserExist && showErrorMessage
                ? t('This email is already exist')
                : errors.email?.message
            }
            label={t('Email')}
            name="email"
            maxLength={255}
            placeholder={t('Your Email address')}
            required
            type={'text'}
            customOnchangeAction={() => setShowErrorMessage(false)}
            rules={{
              required: t('Email cannot be empty'),
              validate: {
                validFormat: (value: string) =>
                  value.match(emailRegex) || t('Invalid email address'),
              },
            }}
          />
        </div>
      </div>
      <div className="createContent__column">
        <div className="form no-title">
          <Input
            Controller={Controller}
            control={control}
            errorMessage={errors.lastName?.message}
            label={t('Last Name')}
            name="lastName"
            maxLength={35}
            placeholder={t('Last name cannot be empty')}
            required
            type={'text'}
            rules={{
              required: t('Last name cannot be empty'),
              validate: (value: string) =>
                value.match(nameRegex) || t('Enter a valid name'),
            }}
          />

          <Input
            Controller={Controller}
            control={control}
            errorMessage={errors.phone?.message}
            label={t('Mobile')}
            name="phone"
            maxLength={35}
            placeholder={t('Mobile Number')}
            required
            type={'text'}
            rules={{
              required: t('Mobile Number cannot be empty'),
            }}
          />
        </div>
      </div>

      <div className="createContent__column">
        <div className="form">
          <Input
            Controller={Controller}
            control={control}
            errorMessage={errors.address?.message}
            label={t('Address')}
            name="address"
            placeholder={t('Address')}
            required
            type={'text'}
            rules={{
              required: t('Address cannot be empty'),
            }}
          />

          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.countryCode?.message}
            label={t('Country')}
            name="countryCode"
            placeholder={t('Select the Country')}
            required
            options={generateCountries}
            rules={{ required: t('Country cannot be empty') }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
