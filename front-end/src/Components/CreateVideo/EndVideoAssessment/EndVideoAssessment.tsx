import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';
import { CommonTypes } from '../../../redux/common/commonReducer';
import DropdownInput from '../../FormInput/DropdownInput/DropdownWithPagination';

interface EndVideoAssessmentProps {
  assessments: CommonTypes['assessments'];
  setValue: any;
  Controller: any;
  control: any;
  errors: any;
  scrollCallBackAssesments: Function;
}

interface DropdownOptions {
  value: string;
  label: string;
}

const EndVideoAssessment: FC<EndVideoAssessmentProps> = ({
  assessments,
  setValue,
  Controller,
  control,
  errors,
  scrollCallBackAssesments,
}) => {
  const [options, setOptions] = useState<DropdownOptions[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (assessments) {
      const dropdownOptions: DropdownOptions[] = assessments.map(assessment => {
        return {
          value: assessment._id,
          label: assessment.title,
        };
      });
      setOptions(dropdownOptions);
    } else {
      setOptions([]);
    }
  }, [assessments]);

  return (
    <>
      <div className="createVideo__inner-row mid-video">
        <div className="form">
          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.endVideoAssessment?.message}
            label={t('Assign An Assessment')}
            name="endVideoAssessmentIds"
            placeholder={t('Select the assessment')}
            options={options}
            rules={{ required: false }}
            scrollCallBack={scrollCallBackAssesments}
          />
        </div>
      </div>
    </>
  );
};

export default EndVideoAssessment;
