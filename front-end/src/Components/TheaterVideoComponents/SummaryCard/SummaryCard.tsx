import React, { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import edit from '../../../assets/images/svg-images/icon-edit2.svg';
import replay from '../../../assets/images/svg-images/icon-replay.svg';
import reWatch from '../../../assets/images/svg-images/icon-rewatch.svg';
import save from '../../../assets/images/svg-images/icon-save.svg';
import { Summary } from '../../../redux/Theater/TheaterReducer';

type SummaryCardProps = {
  isHighlighted: boolean;
  summary: Summary;
  getSummaryStartTime?: (startTime: string) => void;
  onSaveSummery: (summery: string) => void;
  resetSummary: () => void;
  updateRef: (summaryId: string, data: HTMLDivElement | null) => void;
};

const SummaryCard: FC<SummaryCardProps> = ({
  isHighlighted,
  summary,
  getSummaryStartTime,
  onSaveSummery,
  resetSummary,
  updateRef,
}) => {
  const { text, startTime, endTime, _id } = summary;
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [summeryText, setSummeryText] = useState(text);
  useEffect(() => {
    summary && setSummeryText(text);
  }, [summary]);

  return (
    <div
      className={`theaterMode__summaryCard ${
        isHighlighted ? 'isHighlighted' : ''
      }`}
      ref={instance => updateRef(_id, instance)}
    >
      {isEdit ? (
        <textarea
          className="theaterMode__summaryCard--description"
          rows={4}
          cols={50}
          value={summeryText}
          onChange={e => setSummeryText(e.target.value)}
        />
      ) : (
        <p className="theaterMode__summaryCard--description">{summeryText}</p>
      )}
      <div className="theaterMode__summaryCard--bottom">
        <div className="theaterMode__summaryCard--bottom-timer">
          <img
            src={reWatch}
            alt="re watch"
            onClick={() => {
              getSummaryStartTime && getSummaryStartTime(startTime);
            }}
          />
          <p>
            {t('Re watch')}{' '}
            <span>
              | {startTime} - {endTime}
            </span>
          </p>
        </div>
        <div className="theaterMode__summaryCard--bottom-options">
          <img
            className={isEdit ? 'disable' : ''}
            src={replay}
            alt="reset"
            onClick={() => {
              !isEdit && resetSummary();
            }}
          />
          <img
            className={!isEdit ? 'disable' : ''}
            src={save}
            alt="save"
            onClick={() => {
              if (isEdit) {
                onSaveSummery(summeryText);
                setIsEdit(false);
              }
            }}
          />
          <img
            className={isEdit ? 'disable' : ''}
            onClick={() => setIsEdit(true)}
            src={edit}
            alt="edit"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(SummaryCard);
