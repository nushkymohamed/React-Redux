import React, { FC } from 'react';

interface TrialFilterCardProps {
  _id: string;
  name: string;
  isSelect?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
  style: any;
}
const TrialFilterCard: FC<TrialFilterCardProps> = ({
  _id,
  name,
  isSelect,
  onSelect,
  className = 'subjectSelect__item',
  style,
}) => {
  return (
    <div
      className={className}
      onClick={() => onSelect && onSelect(_id)}
      style={style}
    >
      {name}
    </div>
  );
};
export default TrialFilterCard;
