import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TrialSubjectDataType } from '../../redux/trial/TrialReducer';
import Button from '../Button/Button';
import DropdownInput from '../FormInput/DropdownInput';
import Modal from '../Modal/Modal';
import TrialFilterCard from './FilterCard';

type SubjectsSelectModalTypes = {
  generateGrades: {
    value: string;
    label: string;
  }[];
  generateSyllabuses: {
    value: string;
    label: string;
  }[];
  onFilterBySubject: () => void;
  onGradeChange: (id: string) => void;
  onSelectSubject: (id: string) => void;
  onSyllabusChange: (id: string) => void;
  selectedGrade: string;
  selectedSyllabus: string;
  setIsSubjectFilterOpen: (b: boolean) => void;
  subjects: any[] | TrialSubjectDataType[];
};

const SubjectsSelectModal: FC<SubjectsSelectModalTypes> = ({
  generateGrades,
  generateSyllabuses,
  onFilterBySubject,
  onGradeChange,
  onSelectSubject,
  onSyllabusChange,
  selectedGrade,
  selectedSyllabus,
  setIsSubjectFilterOpen,
  subjects,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      customClassName={'productsPopup'}
      onClickAway={() => setIsSubjectFilterOpen(false)}
    >
      <a
        className="btn-close closemodale"
        aria-hidden="true"
        onClick={() => setIsSubjectFilterOpen(false)}
      >
        &times;
      </a>
      <div className="popup--content centerContent subjectsPopUp">
        <div className="productsPopup--wrapper">
          <h2>{t('Subjects')}</h2>
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

            <DropdownInput
              label={t('Grade')}
              name="grade"
              placeholder={t('Grade')}
              required
              options={generateGrades}
              value={selectedGrade}
              customOnchangeAction={e => onGradeChange(e)}
              rules={{ required: t('Grade cannot be empty') }}
            />
          </div>
          <div className="productsPopup--products subjectSelect__wrapper">
            {subjects?.map((subject: TrialSubjectDataType) => {
              return (
                <TrialFilterCard
                  key={subject?._id}
                  _id={subject?._id}
                  name={subject?.name}
                  className="subjectSelect__item"
                  style={{
                    backgroundColor: subject?.isSelect ? '#6ccad3' : '#191919',
                  }}
                  onSelect={(id: string) => {
                    onSelectSubject(id);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div>
          <Button
            type="button"
            className="btn btn--primary btn--roundEdges"
            onClick={() => {
              onFilterBySubject();
              setIsSubjectFilterOpen(false);
            }}
          >
            {t('Search')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubjectsSelectModal;
