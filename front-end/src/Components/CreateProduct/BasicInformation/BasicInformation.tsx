import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortingDropDownOptionList } from '../../../Helper';
import { CommonTypes } from '../../../redux/common/commonReducer';
import CheckBox from '../../FormInput/CheckBox/CheckBox';
import DropdownInput from '../../FormInput/DropdownInput/DropdownWithPagination';
import Input from '../../FormInput/Input';
import TextareaInput from '../../FormInput/TextareaInput/TextareaInput';

interface BasicInformationProps {
  Controller: any;
  control: any;
  errors: any;
  setValue: any;
  countries: CommonTypes['countries'];
  currencies: CommonTypes['currency'];
  currencyPage: number;
  countriesPage: number;
  getCountry: Function;
  getCurrency: Function;
  selectedCountries: Function;
}

interface singleOption {
  value: string;
  label: string;
}

const BasicInformation: FC<BasicInformationProps> = ({
  Controller,
  control,
  errors,
  setValue,
  countries,
  currencies,
  currencyPage,
  countriesPage,
  getCountry,
  getCurrency,
  selectedCountries,
}) => {
  const { t } = useTranslation();

  const [isTrialChecked, setIsTrialChecked] = useState(false);

  const [selectedCountriesArray, setSelectedCountriesArray] = useState<
    singleOption[]
  >([]);

  useEffect(() => {
    setSelectedCountryValue('');
    selectedCountries(selectedCountriesArray?.map(country => country.value));

    setValue(
      'availableCountryCodes',
      selectedCountriesArray.length
        ? selectedCountriesArray.map((a: any) => a.value)
        : null
    );
  }, [selectedCountriesArray]);

  const generateCountries = useMemo(() => {
    if (!countries) {
      return [];
    }

    const optionList = countries.map(({ countryCode, name }) => ({
      value: countryCode,
      label: name,
    }));

    return sortingDropDownOptionList(optionList);
  }, [countries]);

  const generateCurrency = useMemo(() => {
    if (!currencies) {
      return [];
    }

    const optionList = currencies.map(({ _id, currency }) => ({
      value: _id,
      label: currency,
    }));

    return sortingDropDownOptionList(optionList);
  }, [currencies]);

  const filterObjectBySelectedValue = (array: any[], value: string) => {
    return array.filter((item: { value: string }) => item.value === value);
  };
  const addSelectedItemToArray = (state: any, array: any, value: string) => {
    if (!state.filter((item: { value: any }) => item.value === value).length) {
      state.push(filterObjectBySelectedValue(array, value)[0]);
    }

    return state;
  };

  const filteredList = (list: any[], selectedList: any[]) => {
    const mapSelectedList = selectedList.map(({ value }) => value);
    return list.filter(item => !mapSelectedList.includes(item.value));
  };

  const [selectedCountryValue, setSelectedCountryValue] = useState<any>(null);

  const removeObjectFromArray = (
    arrayIndex: number,
    array: any[],
    callback: any
  ) => {
    array.splice(arrayIndex, 1);

    callback([...array]);
  };

  return (
    <>
      <div className="createContent__row basic-info">
        <div className="createContent__column">
          <h3 className="createContent__rowtitle">{t('Basic Information')}</h3>
          <div className="form">
            <Input
              label={t('Product Name')}
              Controller={Controller}
              control={control}
              type={'text'}
              name={'name'}
              errorMessage={errors?.name?.message}
              required={true}
              placeholder={t('Enter Product Name')}
              rules={{
                required: t('Product name cannot be empty'),
              }}
            />

            <TextareaInput
              label={t('Description')}
              Controller={Controller}
              control={control}
              name={'description'}
              rows={3}
              placeholder={t('Product Description')}
              errorMessage={errors?.description?.message}
              rules={{
                required: t('Description cannot be empty'),
              }}
              required
              wrapperClass={
                'form__form--field description-field basic-info-description'
              }
            />

            <div className="form__form--field flexRow">
              <div className="form__form--field flexRow--inner">
                <div className="form__form--field checkbox-wrapper ">
                  <Controller
                    control={control}
                    name="isEligibleForTrials"
                    render={({ onChange }: any) => (
                      <CheckBox
                        handleCheck={(val: boolean) => {
                          setIsTrialChecked(val);
                          onChange(val);
                        }}
                        isChecked={isTrialChecked}
                      />
                    )}
                  />

                  <span className="error">
                    {errors?.contentAccess?.contentAccess}
                  </span>
                </div>
                <p>Trial</p>
              </div>
            </div>
          </div>
        </div>
        <div className="createContent__column moveToLeft">
          <div className="form">
            <DropdownInput
              label={t('Currency')}
              Controller={Controller}
              control={control}
              options={generateCurrency}
              name={'currencyId'}
              errorMessage={errors?.currencyId?.message}
              required={true}
              placeholder={t('Select Currency')}
              rules={{
                required: t('Currency cannot be empty'),
              }}
              scrollCallBack={() => getCurrency(currencyPage + 1)}
              customOnchangeAction={value => setValue('currencyId', value)}
            />

            <DropdownInput
              required
              label={t('Country')}
              Controller={Controller}
              control={control}
              options={filteredList(generateCountries, selectedCountriesArray)}
              name={'availableCountryCodes'}
              errorMessage={errors?.availableCountryCodes?.message}
              rules={{
                required: t('Country cannot be empty'),
              }}
              placeholder={t('Select Country')}
              customOnchangeAction={value => {
                let values: singleOption[] = addSelectedItemToArray(
                  selectedCountriesArray,
                  generateCountries,
                  value
                );

                setSelectedCountryValue(value);
                setSelectedCountriesArray([...values]);
              }}
              scrollCallBack={() => getCountry(countriesPage + 1)}
              value={selectedCountryValue}
            />

            <div className="form__form--field">
              <div className="form__form--field dropdown-selection dropdown-tags">
                {selectedCountriesArray.map((item: any, index) => {
                  return (
                    <p
                      className="form__form--field dropdown-selected"
                      key={index}
                    >
                      {item.label}
                      <a
                        className="btn-close closemodale"
                        aria-hidden="true"
                        onClick={() =>
                          removeObjectFromArray(
                            index,
                            selectedCountriesArray,
                            setSelectedCountriesArray
                          )
                        }
                      >
                        &times;
                      </a>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInformation;
