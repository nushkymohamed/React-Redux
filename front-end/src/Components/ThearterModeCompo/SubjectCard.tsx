import React, { FC, useState } from 'react';
import Button from '../Button/Button';

interface SubjectProps {
  isSelect?: boolean;
}
const SubjectCard: FC<SubjectProps> = ({ isSelect = false }) => {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        background: '#333',
        padding: '0px',
      }}
    >
      <div>
        <div
          style={
            isSelect
              ? {
                  position: 'absolute',
                  height: 200,
                  width: 200,
                  background: 'rgba(0,25,104,0.6)',
                }
              : { position: 'absolute', height: 200, width: 200 }
          }
        >
          <p>Subject</p>
        </div>
        <img
          src="https://picsum.photos/id/237/200/200"
          alt="avatar-icon"
          className="dark-icon icon--avatar"
        />
      </div>
    </div>
  );
};

export default SubjectCard;
