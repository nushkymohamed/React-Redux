import React, { FC } from 'react';

interface CheckBoxProps {
  handleCheck: any;
  isChecked?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({ handleCheck, isChecked }) => {
  return (
    <div className="checkbox" id={`${Math.random()}`}>
      <input type="checkbox" checked={isChecked} readOnly />
      <label onClick={() => handleCheck(!isChecked)} />
    </div>
  );
};

export default CheckBox;
