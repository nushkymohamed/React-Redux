import React, { FC } from 'react';

interface TagsProps {
  list: any[];
  tagLabel: string;
  listReturnMethod: Function;
}

const Tags: FC<TagsProps> = ({ list, tagLabel, listReturnMethod }) => {
  const removeObjectFromArray = (
    arrayIndex: number,
    array: any[],
    callback: any
  ) => {
    array.splice(arrayIndex, 1);

    callback([...array]);
  };
  return (
    <div className="form__form--field dropdown-selection tag-selection">
      {list.map((item: any, index: number) => {
        return (
          <p className="form__form--field dropdown-selected" key={index}>
            {item[tagLabel]}
            <a
              className="btn-close closemodale"
              aria-hidden="true"
              onClick={() =>
                removeObjectFromArray(index, list, listReturnMethod)
              }
            >
              &times;
            </a>
          </p>
        );
      })}
    </div>
  );
};

export default Tags;
