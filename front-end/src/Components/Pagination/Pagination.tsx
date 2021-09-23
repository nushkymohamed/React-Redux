import React, { FC, useEffect, useState } from 'react';

interface paginationProps {
  size: number;
  page: number;
  totalRecords: number;

  onChangePage(page: number): void;

  partition?: number;
}

const Pagination: FC<paginationProps> = ({
  size,
  page,
  totalRecords,
  onChangePage,
  partition = 5,
}) => {
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [offSet, setOffSet] = useState<number>(1);

  useEffect(() => {
    if (!totalRecords) return;
    let array = [];
    let initial = offSet === 1 ? 1 : (offSet - 1) * partition + 1;
    let end =
      offSet * partition >= totalRecords ? totalRecords : offSet * partition;

    for (let i = initial; i <= end; i++) {
      array.push(i);
    }
    setTotalPages(array);
  }, [offSet]);

  const onClickForward = () => {
    if (offSet * partition >= totalRecords) return;
    setOffSet(prevState => prevState + 1);
  };

  const onClickBackward = () => {
    if (offSet === 1) return;
    setOffSet(prevState => prevState - 1);
  };
  return (
    <div>
      <button hidden={offSet === 1} onClick={onClickBackward}>
        {'<'}
      </button>
      {totalPages?.map(pageNumber => (
        <li>
          <span
            className={''}
            onClick={() => page !== pageNumber && onChangePage(pageNumber)}
          >
            {pageNumber}
          </span>
        </li>
      ))}
      <button
        hidden={offSet * partition >= totalRecords}
        onClick={onClickForward}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
