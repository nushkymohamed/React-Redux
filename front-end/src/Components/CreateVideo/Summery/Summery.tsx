import React, { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { convertTimeToNumber } from '../../../Helper';

import TimePicker from '../../FormInput/TimePicker/TimePicker';

interface SummeryProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
  setError: any;
  clearErrors: any;
  disableSubmitOnSummeryError: any;
}

interface summeryType {
  text: string;
  startTime: string;
  endTime: string;
  key: number;
}

const Summery: FC<SummeryProps> = ({
  errors,
  setValue,
  register,
  Controller,
  control,
  setError,
  clearErrors,
  disableSubmitOnSummeryError,
}) => {
  const { t } = useTranslation();

  const initialList: summeryType = {
    text: '',
    startTime: '',
    endTime: '',
    key: Date.now(),
  };

  const [summeryList, setSummeryList] = useState<any[]>([{ ...initialList }]);

  const updateSummery = (index: number, inputKey: string, value: string) => {
    let generatedArray = summeryList.filter(
      (item, summeryIndex) => summeryIndex !== index
    );

    const { startTime, endTime } = summeryList[index];
    let timeAsNumber = convertTimeToNumber(value);
    let currentStartTime = convertTimeToNumber(startTime);
    let currentEndTime = convertTimeToNumber(endTime);

    if (inputKey === 'startTime' || inputKey === 'endTime') {
      let overLapTimeSlot = generatedArray.filter(
        item =>
          convertTimeToNumber(item.startTime) <= timeAsNumber &&
          timeAsNumber <= convertTimeToNumber(item.endTime)
      );

      if (overLapTimeSlot.length) {
        setError('summaries', {
          type: 'manual',
          message: `Two summaries can't contain overlapping times`,
        });
        disableSubmitOnSummeryError(true);
      } else {
        clearErrors('summaries');
        disableSubmitOnSummeryError(false);
        if (inputKey === 'startTime') {
          if (currentEndTime < timeAsNumber) {
            setError('summaries', {
              type: 'manual',
              message: 'Start time must be less than Trigger time',
            });
            disableSubmitOnSummeryError(true);
          } else {
            clearErrors('summaries');
            disableSubmitOnSummeryError(false);
          }
        }

        if (inputKey === 'endTime') {
          if (currentStartTime > timeAsNumber) {
            setError('summaries', {
              type: 'manual',
              message: 'Trigger time must be greater than Start time',
            });
            disableSubmitOnSummeryError(true);
          } else {
            clearErrors('summaries');
            disableSubmitOnSummeryError(false);
          }
        }
      }
    }

    summeryList[index][inputKey] = value;

    setSummeryList([...summeryList]);
  };

  const summeryListFilter = (index: number) => {
    const list = summeryList.filter(
      (item, summeryIndex) => summeryIndex !== index
    );
    return list;
  };

  const removeSummery = (index: number) => {
    let generatedArray = summeryListFilter(index);
    setSummeryList(generatedArray);
  };

  useEffect(() => {
    setValue(
      'summaries',
      summeryList.map(({ key, ...rest }) => rest)
    );
  }, [summeryList]);

  return (
    <div className="summary-wrapper-container">
      <Controller
        control={control}
        name={'summaries'}
        render={() => (
          <div className="summary-container">
            {summeryList.map((data: summeryType, i: number) => (
              <div
                key={data.key}
                className="createContent__row basic-info summary"
              >
                <div className="summary-wrapper">
                  <div className="form__form--field">
                    <label>{t('Summary')}</label>
                    <textarea
                      className="form-input text-area"
                      placeholder={t('Write the summary')}
                      name="summary"
                      rows={3}
                      onChange={e => updateSummery(i, 'text', e.target.value)}
                    />
                  </div>
                  <div className="timer-wrapper">
                    <div>
                      <div className="label"> Start Time</div>
                      <div className="timer-wrapper-time">
                        <TimePicker
                          index={i}
                          name="startTime"
                          action={updateSummery}
                          label="Select Start Time"
                        />
                        <span className="timer-wrapper-time-icon" />
                      </div>
                    </div>
                    <div>
                      <div className="label">Trigger Time</div>
                      <div className="timer-wrapper-time">
                        <TimePicker
                          index={i}
                          action={updateSummery}
                          name="endTime"
                          label="Select Trigger Time"
                        />
                        <span className="timer-wrapper-time-icon" />
                      </div>
                    </div>
                  </div>
                  {summeryList.length > 1 && (
                    <a className="close" onClick={() => removeSummery(i)}>
                      x
                    </a>
                  )}
                </div>
              </div>
            ))}

            <span className="error-message--relative">
              {errors?.summaries?.message}
            </span>

            <div
              className="add-summary-wrapper"
              onClick={() =>
                setSummeryList([
                  ...summeryList,
                  { ...initialList, key: Date.now() },
                ])
              }
            >
              <div className="add-icon" />
              <h4 className="createContent__rowtitle">Add Another Summery</h4>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Summery;
