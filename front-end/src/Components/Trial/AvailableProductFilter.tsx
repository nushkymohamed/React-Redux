import React, { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface BasicInformationType {
  clickedGrade: Function;
  clickedSubject: Function;
  clickedSyllabus: Function;
  onSearchTextChange: (searchString: string) => void;
  selectedGrade: string;
  selectedSyllabus: string;
  subjects: any[];
}

const AvailableProductFilter: FC<BasicInformationType> = ({
  clickedGrade,
  clickedSubject,
  clickedSyllabus,
  onSearchTextChange,
  selectedGrade,
  selectedSyllabus,
  subjects,
}) => {
  const { t } = useTranslation();
  const selectedSubjects = useMemo(() => {
    if (subjects.length) {
      let subjectNames: string = '';
      const selectedSubjects = subjects.filter(subject => subject.isSelect);
      selectedSubjects.forEach(s => {
        subjectNames = subjectNames + s.name + ' / ';
      });
      return subjectNames.slice(0, -3);
    } else {
      return;
    }
  }, [subjects]);
  return (
    <>
      <div className="product--header">
        <input
          className="form-input form-input--search"
          type="search"
          id="search"
          name="product"
          placeholder={t('Search')}
          onChange={e => onSearchTextChange(e.target.value)}
        />

        <div className="tab">
          <input type="checkbox" id="chck1" />
          <label className="tab-label" htmlFor="chck1">
            Filters
          </label>
          <div className="tab-content">
            <div
              className="form__form--field"
              onClick={() => clickedSyllabus()}
            >
              <label>{t('Syllabus')}</label>
              <div className="Dropdown-root form-input">
                <div className="Dropdown-control" aria-haspopup="listbox">
                  <div className="Dropdown-placeholder is-selected">
                    {selectedSyllabus || ''}
                  </div>
                </div>
              </div>
            </div>

            <div className="form__form--field" onClick={() => clickedGrade()}>
              <label>{t('Grade')}</label>
              <div className="Dropdown-root form-input">
                <div className="Dropdown-control" aria-haspopup="listbox">
                  <div className="Dropdown-placeholder is-selected">
                    {selectedGrade || ''}
                  </div>
                </div>
              </div>
            </div>

            <div className="form__form--field" onClick={() => clickedSubject()}>
              <label>{t('Subjects')}</label>
              <div className="Dropdown-root form-input">
                <div className="Dropdown-control" aria-haspopup="listbox">
                  <div className="Dropdown-placeholder is-selected">
                    {selectedSubjects}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableProductFilter;
