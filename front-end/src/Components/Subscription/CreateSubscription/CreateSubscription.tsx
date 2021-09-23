import React, { FC, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PAYMENT_CYCLE } from '../../../config/constants';
import {
  addSelectedItemToArray,
  filteredDropDownOptionList,
  textToTitleCase,
} from '../../../Helper';
import { subscriptionsFeaturesTypes } from '../../../redux/common/commonReducer';
import ButtonWithAnimation from '../../ButtonWithAnimation/ButtonWithAnimation';
import CheckBox from '../../FormInput/CheckBox/CheckBox';
import DropdownInput from '../../FormInput/DropdownInput';
import Input from '../../FormInput/Input';
import Tags from '../../FormInput/Tags/Tags';
import TextareaInput from '../../FormInput/TextareaInput/TextareaInput';

interface CreateSubscription {
  subscriptionsFeatures: subscriptionsFeaturesTypes[];
  onFormSubmit: (arg: object) => void;
  setIsAddSubscriptionOpen: (arg: boolean) => void;
  isTrial: boolean;
  setIsTrial: (arg: boolean) => void;
  subscriptionSaveSuccessful: boolean;
  resetSubscriptionSubmit: () => void;
  setShowOverlay: (arg: boolean) => void;
}

interface singleOption {
  value: string;
  label: string;
}
const CreateSubscription: FC<CreateSubscription> = ({
  subscriptionsFeatures,
  onFormSubmit,
  setIsAddSubscriptionOpen,
  isTrial,
  setIsTrial,
  subscriptionSaveSuccessful,
  resetSubscriptionSubmit,
  setShowOverlay,
}) => {
  const { handleSubmit, errors, control, setValue } = useForm({
    shouldFocusError: true,
  });

  const { t } = useTranslation();

  const generateFeatures = useMemo(() => {
    if (!subscriptionsFeatures) {
      return [];
    }

    return subscriptionsFeatures.map(({ _id, featureTitle }) => ({
      value: _id,
      label: featureTitle,
    }));
  }, [subscriptionsFeatures]);

  const [selectedFeatureArray, setSelectedFeatureArray] = useState<
    singleOption[]
  >([]);

  useEffect(() => {
    if (selectedFeatureArray.length) {
      const subscriptionFeatureIds = selectedFeatureArray.map(
        ({ value }) => value
      );

      setValue('subscriptionFeatureIds', subscriptionFeatureIds);
    }
  }, [selectedFeatureArray]);

  const paymentCycle = Object.keys(PAYMENT_CYCLE).map(key => ({
    label: textToTitleCase(key.replace(/[^a-zA-Z0-9]/g, ' ')),
    value: key,
  }));
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
    if (subscriptionSaveSuccessful) {
      setIsAddSubscriptionOpen(false);
      resetSubscriptionSubmit();
      setShowOverlay(true);
    } else {
      setLoadingAnimation(false);
      setAnimationClassName('');
    }
  }, [subscriptionSaveSuccessful]);

  return (
    <div className="createContent">
      <div className="container">
        <div className="createContent__wrapper">
          <h2 className="page-title"> {t('Create Subscription')}</h2>
          <div className="createContent__row basic-info">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="createContent__column">
                <div className="form">
                  <Input
                    Controller={Controller}
                    control={control}
                    errorMessage={errors?.subscriptionName?.message}
                    label={t('Subscription Name')}
                    maxLength={35}
                    name={'subscriptionName'}
                    placeholder={t('Name')}
                    required
                    type={'text'}
                    rules={{
                      required: t('Subscription Name cannot be empty'),
                    }}
                  />

                  <div className="createContent__innerColumn">
                    <div className="checkbox--wrapper">
                      <CheckBox
                        isChecked={isTrial}
                        handleCheck={() => setIsTrial(!isTrial)}
                      />

                      <span>{t('Trial')}</span>
                    </div>
                    {isTrial ? (
                      <Input
                        Controller={Controller}
                        control={control}
                        errorMessage={errors?.duration?.message}
                        label={t('Duration')}
                        maxLength={3}
                        name={'duration'}
                        placeholder={t('Number of days')}
                        required
                        type={'text'}
                        rules={{
                          required: isTrial
                            ? t('Duration cannot be empty')
                            : false,
                          validate: (value: any) =>
                            !isNaN(value) || t('Enter a valid Duration'),
                        }}
                      />
                    ) : (
                      <DropdownInput
                        Controller={Controller}
                        control={control}
                        errorMessage={errors?.availablePaymentCycle?.message}
                        label={t('Payment Cycle')}
                        name={'availablePaymentCycle'}
                        options={paymentCycle}
                        placeholder={t('Select the Payment Cycle')}
                        required
                        value={''}
                        rules={{
                          required: !isTrial
                            ? t('Payment Cycle cannot be empty')
                            : false,
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="form">
                  <TextareaInput
                    Controller={Controller}
                    control={control}
                    errorMessage={errors?.subscriptionDescription?.message}
                    label={t('Description')}
                    name={'subscriptionDescription'}
                    placeholder={t('Write Here')}
                    required
                    rows={3}
                    rules={{
                      required: t('Description cannot be empty'),
                    }}
                  />
                </div>

                <div className="form">
                  <DropdownInput
                    Controller={Controller}
                    control={control}
                    value={''}
                    label={t('Subscription Feature')}
                    name={'subscriptionFeatureIds'}
                    placeholder={t('Subscription Feature')}
                    options={filteredDropDownOptionList(
                      generateFeatures,
                      selectedFeatureArray
                    )}
                    customOnchangeAction={value => {
                      let values: singleOption[] = addSelectedItemToArray(
                        selectedFeatureArray,
                        generateFeatures,
                        value
                      );

                      setSelectedFeatureArray([...values]);
                    }}
                  />

                  <Tags
                    list={selectedFeatureArray}
                    tagLabel={'label'}
                    listReturnMethod={setSelectedFeatureArray}
                  />
                </div>
              </div>

              <div className="form form-footer">
                <div className="form__form--field buttons">
                  <button
                    className="btn btn--tertiary btn--roundEdges"
                    onClick={() => setIsAddSubscriptionOpen(false)}
                  >
                    {' '}
                    {t('Close')}
                  </button>

                  {!loadingAnimation ? (
                    <button
                      type="submit"
                      className="btn btn--green btn--roundEdges"
                      onClick={() => setIsSubmitClick(true)}
                    >
                      {t('Done')}
                    </button>
                  ) : (
                    <ButtonWithAnimation
                      animationClassName={animationClassName}
                      onTransitionEnd={setAnimationClassName}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscription;
