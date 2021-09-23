import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonTypes } from '../../../redux/common/commonReducer';
import EndVideoAssessment from '../EndVideoAssessment/EndVideoAssessment';
import MidVideoAssessment from '../MidVideoAssessment/MidVideoAssessment';

interface AssessmentProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
  assessments: CommonTypes['assessments'];
  clearErrors: any;
  setValidateMethod: any;
  scrollCallBackAssesments: Function;
}

const Assessment: FC<AssessmentProps> = ({
  register,
  errors,
  setValue,
  Controller,
  control,
  assessments,
  clearErrors,
  setValidateMethod,
  scrollCallBackAssesments,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="createContent__rowtitle">{t('Upload Assessments')}</h3>
      <div className="createContent__inner-row mid-video">
        <div className="assessment_type">
          <span>{t('Mid Video Assessment')}</span>
        </div>

        <MidVideoAssessment
          errors={errors}
          register={register}
          setValue={setValue}
          control={control}
          Controller={Controller}
          clearErrors={clearErrors}
          setValidateMethod={setValidateMethod}
        />
      </div>
      <div className="createContent__inner-row end-video">
        <div className="assessment_type">
          <span>{t('End Video Assessment')}</span>
        </div>
        <EndVideoAssessment
          assessments={assessments}
          setValue={setValue}
          Controller={Controller}
          control={control}
          errors={errors}
          scrollCallBackAssesments={scrollCallBackAssesments}
        />
      </div>
    </>
  );
};

export default Assessment;
