import React, { FC } from 'react';

interface ProgressBarProps {
  selectedIndex: number;
  list: { title: string }[];
  className: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  selectedIndex,
  list,
  className,
}) => {
  const lastSlideNumber = list.length - 1;

  return (
    <div className={`${className}`}>
      <ul>
        {list &&
          list.map((item, index) => {
            const { title } = item;

            let selectedItem = '';
            if (index === selectedIndex) {
              if (lastSlideNumber === selectedIndex) {
                selectedItem = 'complete';
              } else {
                selectedItem = 'active';
              }
            } else if (index < selectedIndex) {
              selectedItem = 'complete';
            }

            return (
              <li key={index} className={selectedItem}>
                <span></span>
                {title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProgressBar;
