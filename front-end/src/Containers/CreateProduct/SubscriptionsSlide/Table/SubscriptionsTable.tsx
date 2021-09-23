import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useSortBy,
  useRowSelect,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';
import sortIcon from '../../../../assets/images/svg-images/sort-arrow.svg';
import NoContent from '../../../../Components/CreateProduct/NoContent/NoContent';
import { uuidv4 } from '../../../../Helper';

interface SubscriptionsTable {
  columns: any;
  data: any[];
  onFormSubmit: Function;
  goToPrevious: Function;
  setIsOpenAddSubscriptionModel: (arg: boolean) => void;
  deleteSubscribe: () => void;
  handledefaultPrice: Function;
  setShowSpecialPricePopup: (arg0: boolean) => void;
  setSelectedSubscriptionsIds: Function;
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
        className="form-input--checkbox"
        name={uuid}
        id={uuid}
        type="checkbox"
        ref={resolvedRef}
        {...rest}
      />
      <label htmlFor={uuid}></label>
    </>
  );
});

const SubscriptionsTable: FC<SubscriptionsTable> = ({
  columns,
  data,
  onFormSubmit,
  goToPrevious,
  deleteSubscribe,
  setIsOpenAddSubscriptionModel,
  handledefaultPrice,
  setShowSpecialPricePopup,
  setSelectedSubscriptionsIds,
}) => {
  const { t } = useTranslation();
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
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    data.length &&
      setSelectedSubscriptionsIds(selectedFlatRows.map(({ id }) => id));
  }, [selectedRowIds]);

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  const [value, setValue] = useState('');

  return (
    <>
      <div className="createTable-table subscriptionTable table__createProduct addSubscription">
        <div className="createTable-table__wrapper">
          <div className="createTable-table__table">
            {data.length ? (
              <>
                <div className="createTable-table__table--searchBar"></div>
                <div className="createTable-table__table--searchBar-filters form">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="form-input form-input--search"
                    placeholder={t('Search Subscription')}
                    value={value || ''}
                    onChange={e => {
                      setValue(e.target.value);
                      onChange(e.target.value);
                    }}
                  />
                </div>

                <div {...getTableProps()}>
                  <div className="createTable-table__table--header">
                    {headerGroups.map(headerGroup => (
                      <div
                        {...headerGroup.getHeaderGroupProps()}
                        className="createTable-table__table--row"
                      >
                        {headerGroup.headers.map((column, index) => (
                          <div
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            className="createTable-table__table--column"
                          >
                            {index !== 0 && (
                              <span>
                                <img
                                  src={sortIcon}
                                  className="icon extra-small-icon marginRight"
                                />
                              </span>
                            )}
                            {column.render('Header')}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div
                    {...getTableBodyProps()}
                    className="createTable-table__table--body"
                  >
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
                                {cell.column.id === 'defaultPrice' ? (
                                  <input
                                    type="text"
                                    value={cell.value}
                                    className="form-input input-no-title"
                                    onChange={e =>
                                      e.target.validity.valid &&
                                      handledefaultPrice(row.id, e.target.value)
                                    }
                                    pattern="^\d+(\.\d{0,2})?$"
                                  />
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
              </>
            ) : (
              <NoContent message={t('No Subscription added')} />
            )}
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left">
                <button
                  className="btn btn--green btn--roundEdges"
                  onClick={() => data.length && setShowSpecialPricePopup(true)}
                >
                  {t('Default Price')}
                </button>

                <button
                  className="btn btn--secondary btn--roundEdges"
                  onClick={deleteSubscribe}
                >
                  {t('Remove')}
                </button>
              </div>
              <div className="createTable-table__table--footer-right">
                <button
                  className="btn btn--primary btn--roundEdges"
                  onClick={() => setIsOpenAddSubscriptionModel(true)}
                >
                  {t('Add Subscription')}
                </button>
              </div>
            </div>
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left"></div>
              <div className="createTable-table__table--footer-right">
                <button
                  onClick={() => goToPrevious()}
                  className="btn btn--secondary"
                >
                  {t('Back')}
                </button>
                <button
                  onClick={() => onFormSubmit()}
                  className="btn btn--primary"
                >
                  {t('Next')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsTable;
