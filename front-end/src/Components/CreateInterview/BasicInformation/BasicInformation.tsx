import React, { FC, useMemo } from 'react';
import Input from '../../FormInput/Input';
import { useTranslation } from 'react-i18next';
import TextareaInput from '../../FormInput/TextareaInput/TextareaInput';
import DropdownInput from '../../FormInput/DropdownInput';

interface BasicInformationType {
  Controller: any;
  control: any;
  errors: any;
  register: any;
  setValue: any;
  order: number;
}

const BasicInformation: FC<BasicInformationType> = ({
  Controller,
  control,
  errors,
  register,
  setValue,
  order,
}) => {
  const { t } = useTranslation();

  const generateOrders = useMemo(() => {
    if (!order) {
      return [];
    }
    let optionList: { label: any; value: any }[] = [];
    for (let i = 0; i <= order; i++) {
      optionList.push({
        value: i + 1,
        label: `${i + 1}`,
      });
    }
    return optionList;
  }, [order]);

  return (
    <div>
      <div className="createContent__column">
        <div className="form">
          <div>
            <div>
              <Input
                Controller={Controller}
                control={control}
                errorMessage={errors.title?.message}
                label={t('Interview Title')}
                name="title"
                placeholder={t('Interview title')}
                required
                type={'text'}
                rules={{
                  required: t('Interview title cannot be empty'),
                }}
              />
              <Input
                Controller={Controller}
                control={control}
                errorMessage={errors.title?.message}
                label={t('Name')}
                name="name"
                placeholder={t('Name')}
                required
                type={'text'}
                rules={{
                  required: t('Name cannot be empty'),
                }}
              />
            </div>
            {/*row 2*/}
            <div>
              <TextareaInput
                Controller={Controller}
                control={control}
                errorMessage={errors.description?.message}
                label={t('Description')}
                name="description"
                placeholder={t('Video description')}
                required
                rules={{
                  required: t('Description cannot be empty'),
                }}
              />
              <DropdownInput
                Controller={Controller}
                options={generateOrders}
                control={control}
                errorMessage={errors.order?.message}
                label={t('Order')}
                name="order"
                placeholder={t('Select Order')}
                required
                rules={{
                  required: t('Order cannot be empty'),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
