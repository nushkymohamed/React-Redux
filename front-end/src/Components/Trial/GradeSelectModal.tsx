import React from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { gradeDetailsTypes } from '../../redux/trial/TrialReducer';
import Button from '../Button/Button';
import DropdownInput from '../FormInput/DropdownInput';
import Modal from '../Modal/Modal';
import TrialFilterCard from './FilterCard';

type GradeSelectModalType = {
  closeGradeFilter: () => void;
  generateSyllabuses: {
    value: string;
    label: string;
  }[];
  grades: any[] | gradeDetailsTypes[] | undefined;
  onFilterByGrade: () => void;
  onSyllabusChange: (e: any) => void;
  selectedGradeId: string;
  selectedSyllabus: string;
  setSelectedGradeId: (id: string) => void;
};

const GradeSelectModal: FC<GradeSelectModalType> = ({
  closeGradeFilter,
  generateSyllabuses,
  grades,
  onFilterByGrade,
  onSyllabusChange,
  selectedGradeId,
  selectedSyllabus,
  setSelectedGradeId,
}) => {
  const { t } = useTranslation();
  return (
    <Modal customClassName={'productsPopup'} onClickAway={closeGradeFilter}>
      <a
        className="btn-close closemodale"
        aria-hidden="true"
        onClick={() => closeGradeFilter()}
      >
        &times;
      </a>
      <div className="popup--content centerContent gradesPopUp">
        <div className="productsPopup--wrapper">
          <h2>{t('Grades')}</h2>
          <div className="productsPopup--filters">
            <DropdownInput
              label={t('Syllabus')}
              name="syllabus"
              placeholder={t('Select the Syllabus')}
              required
              options={generateSyllabuses}
              value={selectedSyllabus}
              rules={{ required: t('Syllabus cannot be empty') }}
              customOnchangeAction={e => onSyllabusChange(e)}
            />
          </div>
          <div className="productsPopup--products subjectSelect__wrapper">
            {grades?.map((grade: gradeDetailsTypes) => {
              return (
                <TrialFilterCard
                  key={grade?._id}
                  _id={grade?._id}
                  name={grade?.name}
                  className="subjectSelect__item"
                  style={{
                    backgroundColor:
                      selectedGradeId === grade?._id ? '#6ccad3' : '#191919',
                  }}
                  onSelect={() =>
                    setSelectedGradeId(
                      selectedGradeId === grade?._id ? '' : grade?._id
                    )
                  }
                />
              );
            })}
          </div>
        </div>

        <div>
          <Button
            type="button"
            className="btn btn--primary btn--curved"
            onClick={onFilterByGrade}
          >
            {t('Search')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GradeSelectModal;
