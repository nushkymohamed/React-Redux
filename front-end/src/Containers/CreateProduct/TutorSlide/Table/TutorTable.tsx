import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useSortBy,
  useRowSelect,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';
import sortIcon from '../../../../assets/images/svg-images/sort-arrow.svg';
import { uuidv4 } from '../../../../Helper';
import InformationalModal from '../../../../Components/CreateProduct/InformationalModal/InformationalModal';


interface TutorTableProps {
  columns: any;
  data: any[];
  addTutor: () => void;
  onFormSubmit: Function;
  goToPrevious: Function;
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

const TutorTable: FC<TutorTableProps> = ({
  columns,
  data,
  onFormSubmit,
  goToPrevious,
  addTutor,
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
  } = tableInstance;

  const [isTutorContentInProduct, setIsTutorContentInProduct] = useState(false);

  const deleteTutors = () => {
    const selectedIds = selectedFlatRows?.map(tu => tu?.id);
    const filteredActiveContentTutors = data?.filter(tu => !tu?.isNotActiveContent);
    const filteredTutors =  filteredActiveContentTutors?.filter(availableTutor => selectedIds?.includes(availableTutor?._id)) || [];
    setIsTutorContentInProduct(!!filteredTutors?.length);
  };

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  const [value, setValue] = useState('');

  return (
    <>
      <div className="createTable-table tutors table__createProduct tutorTable">
        <div className="createTable-table__wrapper">
          <div className="createTable-table__table">
            <div className="createTable-table__table--searchBar"></div>
            <div className="createTable-table__table--searchBar-filters form">
              <input
                type="text"
                id="search"
                name="search"
                className="form-input form-input--search"
                placeholder={t('Search Name')}
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
                            {cell.render('Cell')}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left">
                <button
                  className="btn btn--green btn--roundEdges"
                  onClick={() => deleteTutors()}
                >
                  {t('Remove')}
                </button>
                <button
                  onClick={() => addTutor()}
                  className="btn btn--primary btn--roundEdges"
                >
                  {t('Add Tutor')}
                </button>
              </div>
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

      {isTutorContentInProduct && (
        <InformationalModal
          modelCloseAction={() => setIsTutorContentInProduct(false)}
          message={
            "You can't remove the selected tutor(s) due to active content"
          }
          closeActionText={'Back'}
        />
      )}
    </>
  );
};

export default TutorTable;
