import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { syllabusDetailsTypes } from '../../redux/trial/TrialReducer';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import TrialFilterCard from './FilterCard';

type SyllabusSelectModalType = {
  closeSyllabusFilter: () => void;
  onFilterBySyllabus: () => void;
  selectedSyllabusId: string;
  setSelectedSyllabusId: (id: string) => void;
  syllabuses: syllabusDetailsTypes[];
};

const SyllabusSelectModal: FC<SyllabusSelectModalType> = ({
  closeSyllabusFilter,
  onFilterBySyllabus,
  selectedSyllabusId,
  setSelectedSyllabusId,
  syllabuses,
}) => {
  const { t } = useTranslation();

  return (
    <Modal customClassName={'productsPopup'} onClickAway={closeSyllabusFilter}>
      <a
        className="btn-close closemodale"
        aria-hidden="true"
        onClick={() => closeSyllabusFilter()}
      >
        &times;
      </a>
      <div className="popup--content centerContent syllabusPopUp">
        <div className="productsPopup--wrapper">
          <h2>{t('Syllabuses')}</h2>
          <div className="productsPopup--products subjectSelect__wrapper">
            {syllabuses.map((syllabus: syllabusDetailsTypes) => {
              return (
                <TrialFilterCard
                  key={syllabus?._id}
                  _id={syllabus?._id}
                  name={syllabus?.name}
                  className="subjectSelect__item"
                  style={{
                    backgroundColor:
                      selectedSyllabusId === syllabus?._id
                        ? '#6ccad3'
                        : '#191919',
                  }}
                  onSelect={() =>
                    setSelectedSyllabusId(
                      selectedSyllabusId === syllabus?._id ? '' : syllabus?._id
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
            onClick={onFilterBySyllabus}
          >
            {t('Search')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SyllabusSelectModal;
