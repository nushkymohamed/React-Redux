import React, { FC, useEffect } from 'react';
import {
  useRowSelect,
  useSortBy,
  useTable,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';

import sortIcon from '../../../assets/images/svg-images/sort-arrow.svg';
import { uuidv4 } from '../../../Helper';

interface AccessControlTableProps {
  columns: any[];
  data: any[];
  handleSingleAccess: Function;
  handleSingleSpecialPrice: Function;
  setMultiSelectedItems: Function;
  searchText: string;
}
export type ICheckboxProps = {
  indeterminate?: boolean;
};

export const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  ICheckboxProps
>(({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
  const defaultRef = React.useRef(null);
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    if (typeof resolvedRef === 'object' && resolvedRef.current) {
      resolvedRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [resolvedRef, indeterminate]);

  const uuid = uuidv4();

  return (
    <>
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        name={uuid}
        id={uuid}
        className="form-input--checkbox"
      />
      <label htmlFor={uuid}></label>
    </>
  );
});
const AccessControlTable: FC<AccessControlTableProps> = ({
  columns,
  data,
  handleSingleAccess,
  setMultiSelectedItems,
  searchText,
  handleSingleSpecialPrice,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      getRowId: (row: any) => row._id,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
    setGlobalFilter,
  } = tableInstance;

  useEffect(() => {
    setMultiSelectedItems(selectedFlatRows.map(row => row.original));
  }, [selectedRowIds]);

  const onSearchTextChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  useEffect(() => {
    onSearchTextChange(searchText);
  }, [searchText]);

  return (
    <div {...getTableProps()}>
      <div className="createTable-table__table--header">
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className="createTable-table__table--row"
          >
            {headerGroup.headers.map((column, index) => (
              <div
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="createTable-table__table--column"
              >
                {index !== 0 && (
                  <img
                    src={sortIcon}
                    className="icon extra-small-icon marginRight"
                  />
                )}
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className="createTable-table__table--body">
        {rows.map(row => {
          prepareRow(row);
          return (
            <div
              {...row.getRowProps()}
              className="createTable-table__table--row"
            >
              {row.cells.map(cell => {
                return (
                  <div
                    {...cell.getCellProps()}
                    className="createTable-table__table--column"
                  >
                    {cell.column.id === 'access' ? (
                      <>
                        <input
                          type="checkbox"
                          checked={Boolean(cell.value)}
                          className="form-input--checkbox"
                          readOnly
                        />
                        <label
                          htmlFor=""
                          onClick={() =>
                            handleSingleAccess(row.id, !cell.value)
                          }
                        ></label>
                      </>
                    ) : cell.column.id === 'specialPrice' ? (
                      <>
                        <input
                          type="text"
                          value={cell.value}
                          className="form-input input-no-title"
                          onChange={e =>
                            e.target.validity.valid &&
                            handleSingleSpecialPrice(row.id, e.target.value)
                          }
                          pattern="^\d+(\.\d{0,2})?$"
                        />
                      </>
                    ) : (
                      cell.render('Cell')
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessControlTable;
