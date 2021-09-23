import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import NoContent from '../../Components/CreateProduct/NoContent/NoContent';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import Modal from '../../Components/Modal/Modal';
import AvailableProductFilter from '../../Components/Trial/AvailableProductFilter';
import GradeSelectModal from '../../Components/Trial/GradeSelectModal';
import AvailableProductsSlider from '../../Components/Trial/ProductsSlider';
import SubjectsSelectModal from '../../Components/Trial/SubjectsSelectModal';
import SyllabusSelectModal from '../../Components/Trial/SyllabusSelectModal';
import {
  CONTENT_SERVICE,
  PAYMENT_SERVICE,
  PRODUCT_CONTENT_SERVICE,
  PRODUCT_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useTotalNumberOfRecords from '../../Hooks/useTotalNumberOfRecords';
import { RootStore } from '../../redux/store';
import {
  gradeDetailsTypes,
  syllabusDetailsTypes,
} from '../../redux/trial/TrialReducer';
import {
  GET_ALL_SYLLABUSES_REQUEST,
  RESET_PRODUCTS,
  SELECT_TOGGLE_SUBJECT_FILTER,
  TRIAL_CURRENCY_FAILED,
  TRIAL_CURRENCY_REQUEST,
  TRIAL_CURRENCY_SUCCESS,
  TRIAL_GRADES_FAILED,
  TRIAL_GRADES_REQUEST,
  TRIAL_GRADES_RESET,
  TRIAL_GRADES_SUCCESS,
  TRIAL_GRADE_BY_ID_FAILED,
  TRIAL_GRADE_BY_ID_REQUEST,
  TRIAL_GRADE_BY_ID_SUCCESS,
  TRIAL_PRODUCTS_FAILED,
  TRIAL_PRODUCTS_REQUEST,
  TRIAL_PRODUCTS_SUCCESS,
  TRIAL_PRODUCT_CONTENT_FAILED,
  TRIAL_PRODUCT_CONTENT_REQUEST,
  TRIAL_PRODUCT_CONTENT_SUCCESS,
  TRIAL_PRODUCT_IDS_FAILED,
  TRIAL_PRODUCT_IDS_REQUEST,
  TRIAL_PRODUCT_IDS_SUCCESS,
  TRIAL_SELECT_PRODUCT,
  TRIAL_SUBJECT_FAILED,
  TRIAL_SUBJECT_REQUEST,
  TRIAL_SUBJECT_RESET,
  TRIAL_SUBJECT_SUCCESS,
  TRIAL_SYLLABUSES_FAILED,
  TRIAL_SYLLABUSES_SUCCESS,
  TRIAL_SYLLABUS_REQUEST,
} from '../../redux/trial/TrialType';
import ProductCard from './ProductCard';

interface ProductContainerProps {
  goToNext: () => void;
  goToPrevious: () => void;
}
const AvailableProductContainer: FC<ProductContainerProps> = ({
  goToNext,
  goToPrevious,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<any>({});
  const [productIndex, setProductIndex] = useState<number>(0);

  const [allSyllabusesRequest] = useApi();
  const [allGradesRequest] = useApi();

  const [syllabusRequest] = useApi();
  const [gradeRequest] = useApi();
  const [subjectsRequest] = useApi();

  const [productsRequest] = useApi();
  const [allAvailableProductsId] = useApi();
  const [productsContentProductsId] = useApi();
  const [isNewRequest, setIsNewRequest] = useState<boolean>(false);

  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const [selectedSyllabus, setSelectedSyllabus] = useState('');

  const [selectedSyllabusId, setSelectedSyllabusId] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');

  const [selectedGrade, setSelectedGrade] = useState('');

  const [searchString, setSearchString] = useState('');

  const [isSyllabusFilterOpen, setIsSyllabusFilterOpen] = useState(false);
  const [isGradeFilterOpen, setIsGradeFilterOpen] = useState(false);

  const [isSubjectFilterOpen, setIsSubjectFilterOpen] = useState(false);

  const dispatch = useDispatch();
  const [getTotalRecords, totalRecords] = useTotalNumberOfRecords();

  const {
    gradeSize,
    grades,
    isLoadingProducts,
    productIds,
    productPage,
    productSize,
    productTotalRecords,
    products,
    selectedProducts,
    selectedSubscription,
    size,
    subjects,
    syllabusSize,
    syllabuses,
    userDetails,
  } = useSelector((state: RootStore) => state?.trial);

  useEffect(() => {
    getTotalRecords(
      `/users/${userDetails?._id}/eligible-subscriptions/${selectedSubscription?._id}/allowedProducts?page=1&size=1`,
      PAYMENT_SERVICE
    );
  }, [selectedSubscription]);

  const filteredProductIds = useMemo(() => {
    if (!productIds?.length) {
      return [];
    }

    return productIds?.map(({ productId }: { productId: string }) => productId);
  }, [productIds]);

  const onChangeFilter = (data: { key: string; value: string }) => {
    const cloneFormData = { ...formData };
    cloneFormData[data.key] = data.value;
    setFormData({ ...formData, ...cloneFormData });
  };

  useEffect(() => {
    fetchAllSyllabuses(1);
    fetchGrades(1);
    setSelectedSyllabusId(userDetails?.currentSyllabusId || '');
    onSyllabusChange(userDetails?.currentSyllabusId || '');
    setSelectedGradeId(userDetails?.currentGradeId || '');
    onGradeChange(userDetails?.currentGradeId || '');
  }, [userDetails]);

  useEffect(() => {
    selectedSubscription?._id &&
      totalRecords > 0 &&
      fetchAvailableProductIds(totalRecords);
  }, [selectedSubscription, totalRecords]);

  const fetchAvailableProductIds = (totalRecords: number) => {
    allAvailableProductsId(
      `/users/${userDetails?._id}/eligible-subscriptions/${selectedSubscription?._id}/allowedProducts?page=1&size=${totalRecords}`,
      TRIAL_PRODUCT_IDS_REQUEST,
      TRIAL_PRODUCT_IDS_SUCCESS,
      TRIAL_PRODUCT_IDS_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE
    );
  };

  const fetchAllSyllabuses = (pageNumber: number) => {
    // make sure the countryCodes
    allSyllabusesRequest(
      `/syllabuses?countryCodes=${[
        userDetails?.countryCodeList,
      ]}&page=${pageNumber}&size=${syllabusSize}`,
      GET_ALL_SYLLABUSES_REQUEST,
      TRIAL_SYLLABUSES_SUCCESS,
      TRIAL_SYLLABUSES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const fetchGrades = (pageNumber: number) => {
    allGradesRequest(
      `/syllabuses/${userDetails?.currentSyllabusId}/grades?page=${pageNumber}&size=${gradeSize}`,
      TRIAL_GRADES_REQUEST,
      TRIAL_GRADES_SUCCESS,
      TRIAL_GRADES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (filteredProductIds?.length) {
      fetchProducts(
        filteredProductIds,
        1,
        userDetails?.currentSyllabusId,
        userDetails?.currentGradeId,
        selectedSubjectIds()
      );
      setIsNewRequest(true);
    }
  }, [productIds]);

  useEffect(() => {
    filteredProductIds &&
      fetchProducts(
        filteredProductIds,
        1,
        selectedSyllabus,
        selectedGrade,
        selectedSubjectIds()
      );
  }, [searchString]);

  const loadMoreProducts = () => {
    if (productTotalRecords > (products?.length || 0)) {
      filteredProductIds &&
        fetchProducts(
          filteredProductIds,
          productPage + 1,
          selectedSyllabus,
          selectedGrade,
          selectedSubjectIds()
        );
    }
  };

  const selectedSubjectIds = () => {
    return subjects
      ?.filter(subject => subject.isSelect)
      ?.map(subject => {
        return subject._id;
      });
  };

  const resetSubjects = () => {
    dispatch({
      type: TRIAL_SUBJECT_RESET,
    });
  };
  const resetGrades = () => {
    dispatch({
      type: TRIAL_GRADES_RESET,
    });
  };

  const fetchProducts = (
    proIds: string[],
    page: number,
    syllabusId: string,
    gradeId?: string,
    subjects?: string[]
  ) => {
    productsRequest(
      `/products?productIds=${proIds}&size=${productSize}${
        syllabusId ? `&syllabusId=${syllabusId}` : ''
      }${gradeId ? `&gradeId=${gradeId}` : ''}${
        subjects?.length ? `&subjectIds=${subjects}` : ''
      }&page=${page}${searchString ? `&name=${searchString}` : ''}`,
      TRIAL_PRODUCTS_REQUEST,
      TRIAL_PRODUCTS_SUCCESS,
      TRIAL_PRODUCTS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_SERVICE,
      { page }
    );
  };

  useEffect(() => {
    if (filteredProductIds?.length && products?.length && isNewRequest) {
      fetchProductsContents(filteredProductIds, 1);
      setIsNewRequest(false);
    }
  }, [products]);

  const fetchProductsContents = (ids: string[], page: number) => {
    productsContentProductsId(
      `/product-stats?productIds=${ids}&size=${productSize}&page=${page}`,
      TRIAL_PRODUCT_CONTENT_REQUEST,
      TRIAL_PRODUCT_CONTENT_SUCCESS,
      TRIAL_PRODUCT_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (syllabuses?.length && Object.keys(userDetails).length) {
      const isAvailable = syllabuses?.findIndex(
        syllabus => syllabus?._id === userDetails?.currentSyllabusId
      );
      if (isAvailable === -1) {
        syllabusRequest(
          `/syllabuses?syllabusIds=${[userDetails?.currentSyllabusId]}`,
          TRIAL_SYLLABUS_REQUEST,
          TRIAL_SYLLABUS_REQUEST,
          TRIAL_SYLLABUS_REQUEST,
          {},
          {},
          'GET',
          false,
          CONTENT_SERVICE
        );
      }
    }
  }, [syllabuses, userDetails]);

  useEffect(() => {
    if (grades?.length && Object.keys(userDetails).length) {
      const isAvailable = grades?.findIndex(
        grade => grade?._id === userDetails?.currentGradeId
      );
      if (
        isAvailable === -1 &&
        selectedSyllabus === userDetails?.currentSyllabusId
      ) {
        gradeRequest(
          `/grades?gradeIds=${[userDetails?.currentGradeId]}`,
          TRIAL_GRADE_BY_ID_REQUEST,
          TRIAL_GRADE_BY_ID_SUCCESS,
          TRIAL_GRADE_BY_ID_FAILED,
          {},
          {},
          'GET',
          false,
          CONTENT_SERVICE
        );
      }
    }
  }, [grades, userDetails]);

  const selectProduct = (id: string) => {
    dispatch({
      type: TRIAL_SELECT_PRODUCT,
      payload: { dataWrapper: { data: { id } } },
    });
  };

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) return [];
    return syllabuses.map((syllabus: syllabusDetailsTypes) => ({
      value: syllabus._id,
      label: syllabus.name,
    }));
  }, [syllabuses]);

  const generateGrades = useMemo(() => {
    if (!grades) return [];
    return grades.map((grade: gradeDetailsTypes) => ({
      value: grade._id,
      label: grade.name,
    }));
  }, [grades]);

  const [currencyRequest] = useApi();

  useEffect(() => {
    if (products?.length) {
      const currencyInfoRequiredProductList = products.filter(
        ({ currency }) => !currency
      );

      const currencyIds = currencyInfoRequiredProductList.map(
        ({ currencyId }) => currencyId
      );

      currencyIds.length &&
        currencyRequest(
          `/currencies?currencyIds=${currencyIds}`,
          TRIAL_CURRENCY_REQUEST,
          TRIAL_CURRENCY_SUCCESS,
          TRIAL_CURRENCY_FAILED,
          {},
          {},
          'GET',
          false,
          PAYMENT_SERVICE
        );
    }
  }, [products]);

  const onFilterUpdate = (key: string, value: string) =>
    onChangeFilter({ key, value });

  const onSyllabusChange = (syllabusId: string) => {
    setSelectedSyllabus(syllabusId);
  };
  const onGradeChange = (gradeId: string) => {
    setSelectedGrade(gradeId);
  };

  const onSearchTextChange = (searchText: string) => {
    onFilterUpdate('product', searchText);
    setSearchString(searchText);
    dispatch({
      type: RESET_PRODUCTS,
    });
  };

  useEffect(() => {
    resetGrades();
    if (selectedSyllabus) {
      allGradesRequest(
        `/syllabuses/${selectedSyllabus}/grades?page=1&size=${gradeSize}`,
        TRIAL_GRADES_REQUEST,
        TRIAL_GRADES_SUCCESS,
        TRIAL_GRADES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
    }
  }, [selectedSyllabus]);

  useEffect(() => {
    if (selectedGrade) {
      subjectsRequest(
        `/grades/${selectedGrade}/subjects?page=1&size=${size}`,
        TRIAL_SUBJECT_REQUEST,
        TRIAL_SUBJECT_SUCCESS,
        TRIAL_SUBJECT_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
    }
  }, [selectedGrade]);

  const onSelectSubject = (id: string) => {
    dispatch({
      type: SELECT_TOGGLE_SUBJECT_FILTER,
      payload: { customInput: id },
    });
  };

  const onFilterBySyllabus = () => {
    resetSubjects();
    onFilterUpdate('syllabus', selectedSyllabusId);
    setSelectedSyllabus(selectedSyllabusId);
    setSelectedGradeId('');
    setSelectedGrade('');
    fetchProducts(filteredProductIds || [], 1, selectedSyllabusId);
    closeSyllabusFilter(false);
  };

  const onFilterByGrade = () => {
    resetSubjects();
    onFilterUpdate('grade', selectedGradeId);
    setSelectedGrade(selectedGradeId);
    fetchProducts(
      filteredProductIds || [],
      1,
      selectedSyllabus,
      selectedGradeId
    );
    closeGradeFilter(false);
  };

  const onFilterBySubject = () => {
    onFilterUpdate('syllabus', selectedSyllabus);
    onFilterUpdate('grade', selectedGrade);
    setSelectedGrade(selectedGrade);
    setSelectedSyllabus(selectedSyllabus);
    fetchProducts(
      filteredProductIds || [],
      1,
      selectedSyllabus,
      selectedGrade,
      selectedSubjectIds()
    );
  };

  const closeSyllabusFilter = (resetFilter: boolean = true) => {
    setIsSyllabusFilterOpen(false);
    resetFilter && setSelectedSyllabusId(selectedSyllabus);
  };
  const closeGradeFilter = (resetFilter: boolean = true) => {
    setIsGradeFilterOpen(false);
    resetFilter && setSelectedGradeId(selectedGrade);
  };

  const syllabusName = useMemo(() => {
    return (
      syllabuses?.find(({ _id }) => {
        return _id === selectedSyllabus;
      })?.name || ''
    );
  }, [selectedSyllabus, syllabuses]);
  const gradeName = useMemo(() => {
    return (
      grades?.find(({ _id }) => {
        return _id === selectedGrade;
      })?.name || ''
    );
  }, [selectedGrade, grades]);

  return (
    <>
      <div className="createContent">
        <div className="container">
          <div className="createContent__wrapper product--wrapper">
            <div className="page-title">
              <h1>{t('Available Products')}</h1>
            </div>

            <AvailableProductFilter
              subjects={subjects}
              clickedSyllabus={() => setIsSyllabusFilterOpen(true)}
              clickedGrade={() => setIsGradeFilterOpen(true)}
              clickedSubject={() => setIsSubjectFilterOpen(true)}
              onSearchTextChange={onSearchTextChange}
              selectedSyllabus={syllabusName}
              selectedGrade={gradeName}
            />
            <div className="product--cards">
              {isLoadingProducts && !products?.length ? (
                <LoadingScreen />
              ) : (
                <AvailableProductsSlider
                  openFullViewModel={index => {
                    setIsOpenDetails(true);
                    setProductIndex(index);
                  }}
                  products={products || []}
                  selectProduct={selectProduct}
                  page={productPage}
                  size={productSize}
                  totalRecords={productTotalRecords}
                  loadMoreProducts={loadMoreProducts}
                  selectedProducts={selectedProducts}
                />
              )}
              {!products?.length && !isLoadingProducts ? <NoContent /> : null}
            </div>

            <div className="product--footer">
              <button
                type="submit"
                className="btn btn--secondary"
                onClick={goToPrevious}
              >
                {t('Back')}
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                onClick={goToNext}
              >
                {t('Next')}
              </button>
            </div>
            {isOpenDetails && (
              <Modal
                onClickAway={() => setIsOpenDetails(false)}
                customClassName={'product--card__popup'}
              >
                <ProductCard
                  selectProduct={selectProduct}
                  closeModel={() => setIsOpenDetails(false)}
                  productData={products && products[productIndex]}
                  isFullView={true}
                />
              </Modal>
            )}

            {isSyllabusFilterOpen && (
              <SyllabusSelectModal
                closeSyllabusFilter={closeSyllabusFilter}
                onFilterBySyllabus={onFilterBySyllabus}
                selectedSyllabusId={selectedSyllabusId}
                setSelectedSyllabusId={setSelectedSyllabusId}
                syllabuses={syllabuses}
              />
            )}

            {isGradeFilterOpen && (
              <GradeSelectModal
                closeGradeFilter={closeGradeFilter}
                generateSyllabuses={generateSyllabuses}
                grades={grades}
                onFilterByGrade={onFilterByGrade}
                onSyllabusChange={onSyllabusChange}
                selectedGradeId={selectedGradeId}
                selectedSyllabus={selectedSyllabus}
                setSelectedGradeId={setSelectedGradeId}
              />
            )}

            {isSubjectFilterOpen && (
              <SubjectsSelectModal
                generateGrades={generateGrades}
                generateSyllabuses={generateSyllabuses}
                onFilterBySubject={onFilterBySubject}
                onGradeChange={onGradeChange}
                onSelectSubject={onSelectSubject}
                onSyllabusChange={onSyllabusChange}
                selectedGrade={selectedGrade}
                selectedSyllabus={selectedSyllabus}
                setIsSubjectFilterOpen={setIsSubjectFilterOpen}
                subjects={subjects}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AvailableProductContainer;
