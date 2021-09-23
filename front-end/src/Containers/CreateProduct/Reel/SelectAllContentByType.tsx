import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSelectMultiple } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

interface SelectAllContentByType {
  contentTab: string;
  reelIndex: number;
  selectedTutorId: string;
  currentSelectedTutorTabContentData: boolean;
  dispatchType: string;
}

const SelectAllContentByType: FC<SelectAllContentByType> = ({
  contentTab,
  reelIndex,
  selectedTutorId,
  currentSelectedTutorTabContentData,
  dispatchType,
}) => {

  const {t} = useTranslation()
  const dispatch = useDispatch();

  const selectAllContentByType = () => {
    dispatch({
      type: dispatchType,
      payload: {
        dataWrapper: { data: null },
        customInput: { reelIndex, contentTab, selectedTutorId },
      },
    });
  };
  return (
    <div className="btn--selectAll">
      <p onClick={() => selectAllContentByType()}>
        {t(currentSelectedTutorTabContentData ? 'Select None' : 'Select All')}
        <span>
          <BiSelectMultiple />
        </span>
      </p>
    </div>
  );
};

export default SelectAllContentByType;
