import { v4 } from 'uuid';
import {
  contentType,
  PAYMENT_CYCLE,
  SocketRedirect,
  SocketStatus,
  SocketTasks,
  subscriptionPaymentCycle,
  userRoles,
} from '../config/constants';
import { userTypes } from '../redux/auth/authReducer';
import { CommonTypes } from '../redux/common/commonReducer';
import {
  contentIdsProps,
  tutorAndSelectedContent,
} from '../redux/product/productReducer';
import {
  countryDetailsTypes,
  gradeDetailsTypes,
  subjectDetailsTypes,
  syllabusDetailsTypes,
} from '../redux/userManagement/userIndividualManagementReducer';

export const uuidv4 = () => {
  return v4();
};

export const mapArrayIntoDropDownOption = (
  list: any[],
  value: string,
  name: string
) => {
  return list.map(item => ({
    value: item[value],
    label: item[name],
  }));
};

export const getArrayIndexUsingKey = (list: any[], key: string, value: any) => {
  return list.findIndex(element => element[key] === value);
};

export const filterListByKey = (
  list: any[] | null,
  key: string,
  value: any | null
) => {
  if (!list) {
    return [];
  }

  return list.filter(item => item[key] === value);
};

export const filterOutSelectedOptionLabelAndValue = (
  array: { label: string; value: string }[],
  value: string
) => {
  return array.filter(item => item.value === value);
};

export const uploadDataMangeOnUseEffect = (
  uploadProgress: number,
  setIsFileUploading: (arg0: boolean) => void,
  uploadedContent: { key: any },
  s3BucketInfo: CommonTypes['s3BucketInfo'],
  uploadFileKey: string | number,
  action: (arg0: { fileKey: any; bucketName: any }, arg1: any) => void,
  componentKey: any,
  setUploadedFileData: (arg0: any) => void
) => {
  if (uploadProgress !== 0 && uploadProgress < 100) {
    console.log('file uploading');
    setIsFileUploading(true);
  } else if (uploadedContent?.key && uploadProgress == 100) {
    console.log('file uploading Done');

    const { bucketName } = {
      ...s3BucketInfo?.[uploadFileKey],
    };

    action(
      {
        fileKey: uploadedContent.key,
        bucketName,
      },
      componentKey
    );
    setIsFileUploading(false);
    setUploadedFileData(uploadedContent);
  }
};

export const sendDataIntoUseFileUploadHook = (
  s3BucketInfo: CommonTypes['s3BucketInfo'],
  uploadFileKey: string | number,
  upload: (
    data: any,
    fileKey: string | undefined,
    bucketName: string | undefined
  ) => void,
  data: any
) => {
  const { fileKey, bucketName } = { ...s3BucketInfo?.[uploadFileKey] };

  if (data) {
    upload(data, fileKey, bucketName);
  }
};

export const getMonths = () => {
  let monthList: { value: any; label: any }[] = [];
  for (let i = 1; i <= 12; i++) {
    let generated_value = i;
    monthList.push({
      value: generated_value,
      label: `${generated_value}`,
    });
  }
  return monthList;
};

export const getYears = () => {
  let yearList: { value: any; label: any }[] = [];
  for (let i = 1970; i <= new Date().getFullYear(); i++) {
    let generated_value = i;
    yearList.push({
      value: generated_value,
      label: `${generated_value}`,
    });
  }
  return yearList;
};

export const getOrders = (orders: number) => {
  if (!orders) {
    return [];
  }
  let optionList = [];
  for (let i = 0; i < orders; i++) {
    let generated_value = i + 1;
    optionList.push({
      value: generated_value,
      label: `${generated_value}`,
    });
  }
};

export const sortingDropDownOptionList = (array: any[]) => {
  return array.sort((a: { label: string }, b: { label: any }) =>
    a.label.localeCompare(b.label)
  );
};

export const truncateString = (source: string, size: number) => {
  return source?.length > size ? source.slice(0, size - 1) + '…' : source;
};

export const truncateText = (text: string, characterLimit: number) => {
  if (text?.length > characterLimit) {
    const truncateText = text.substr(0, characterLimit) + '...';
    return truncateText;
  } else {
    return text;
  }
};

export const truncateFileName = (filename: string, characterLimit: number) => {
  const limit = (characterLimit - 3) / 2;
  if (filename?.length > characterLimit) {
    const truncatedFileName =
      filename.substr(0, limit) +
      '...' +
      filename.substr(filename.length - limit);
    return truncatedFileName;
  } else {
    return filename;
  }
};

export const sortingArray = (array: any[]) => {
  return array.sort((a: { label: string }, b: { label: any }) =>
    a.label.localeCompare(b.label)
  );
};

export const convertTimeToNumber = (value: string) => {
  let numb: any = value.match(/\d/g);
  numb = numb?.length ? numb.join('') : 0;
  return Number(numb);
};
export const convertTimeToSeconds = (value: string) => {
  let totalSeconds = -1;
  if (value) {
    const hours = value?.split(':')[0];
    const miniutes = value?.split(':')[1];
    const seconds = value?.split(':')[2];

    totalSeconds =
      Number(hours) * 60 * 60 + Number(miniutes) * 60 + Number(seconds);
  }

  return totalSeconds;
};

export const filterObjectBySelectedValueAndKey = (
  array: any[],
  key: string,
  value: string
) => {
  return array.filter(item => item[key] === value);
};

export const addSelectedItemToArray = (
  state: any,
  array: any[],
  value: string
) => {
  if (!filterObjectBySelectedValueAndKey(state, 'value', value).length) {
    state.push(filterObjectBySelectedValueAndKey(array, 'value', value)[0]);
  }

  return state;
};

export const tagsCreateWithoutDuplication = (
  e: { preventDefault?: any; target?: { value: string }; key?: any },
  tagList: any[],
  action: any,
  resetAction: any
) => {
  const { target, key } = e;
  key === 'Enter' && e.preventDefault();
  if (key === ',' || key === 'Enter') {
    const { value } = target || {};

    const textString = value?.replace(/,/g, '');

    if (textString !== '') {
      const duplicateTags = tagList.filter(({ label }) => textString === label);
      if (!duplicateTags.length) {
        let list = [...tagList, { label: textString }];
        action(list);
        resetAction('');
      }
    }
  }
};

export const onImageLoadError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  defaultProductImage: string
) => {
  const target = e.target as HTMLImageElement;
  if (target.src !== defaultProductImage) {
    target.onerror = null;
    target.src = defaultProductImage;
  }
};
export const resetReducerDataByCommonType = (dispatch: any, list: string[]) => {
  list.forEach(type =>
    dispatch({
      type,
    })
  );
};

export const avoidedDuplicationData = (
  currentData: any[] | null,
  newData: any[] | undefined,
  key: string
) => {
  if (!newData) {
    return currentData;
  }

  const existingValues = currentData?.map(item => item[key]);

  const filteredData = newData.filter(
    item => !existingValues?.includes(item[key])
  );

  return [...(currentData || []), ...filteredData];
};

export const getDistinctArray = (gradeId: any) => {
  return Array.from(new Set(gradeId));
};

export const filterArrayComparison = (
  previous: string[] | null,
  current: string[] | null
) => {
  let newFilters: string[] = [];
  let removedFilters: string[] = [];

  if (!previous?.length && current?.length) {
    newFilters = current;
  }
  if (previous?.length && !current?.length) {
    removedFilters = previous;
  }

  if (previous?.length && current?.length) {
    previous.forEach(p => {
      if (!current.includes(p)) {
        removedFilters.push(p);
      }
    });

    current.forEach(c => {
      if (!previous.includes(c)) {
        newFilters.push(c);
      }
    });
  }

  return { newFilters, removedFilters };
};

export const generateTutorEducatinalData = (
  tutorCountryData: countryDetailsTypes[],
  tutorSyllabusData: syllabusDetailsTypes[],
  tutorGradesData: gradeDetailsTypes[],
  tutorSubjectData: subjectDetailsTypes[]
) => {
  const generatedMapData = tutorCountryData?.map((country: any) => {
    const tutorSyllabus = tutorSyllabusData?.filter(
      ({ countryCode }: any) => country.countryCode === countryCode
    );

    country.syllabus = tutorSyllabus || [];

    country.syllabus = country.syllabus.map((syllabus: any) => {
      const tutorGrades = tutorGradesData?.filter(
        ({ syllabusId }: any) => syllabus._id === syllabusId
      );
      syllabus.grades = tutorGrades || [];

      syllabus.grades = syllabus.grades.map((grades: any) => {
        const tutorSubject = tutorSubjectData?.filter(
          ({ gradeId }: any) => grades._id === gradeId
        );
        grades.subjects = tutorSubject || [];
        return grades;
      });
      return syllabus;
    });

    return country;
  });
  return generatedMapData;
};
export const textToTitleCase = (text: string) => {
  if (!text) {
    return '';
  }
  return text
    ?.split(' ')
    .map(word => word[0]?.toUpperCase() + word.slice(1)?.toLowerCase())
    .join(' ');
};
export const checkUserUpdateSocket = (socketMessage: any, userId: string) => {
  let status = '';
  if (
    socketMessage?.userId === userId &&
    socketMessage?.task === SocketTasks.USER_UPDATE
  ) {
    if (socketMessage?.webSocketResponseStatus === SocketStatus.SUCCESS) {
      status = SocketRedirect.USER_VIEW;
    } else {
      status = SocketRedirect.HOME;
    }
  }
  return status;
};

export const arrayPaginate = (
  array: any[],
  page_size: number,
  page_number: number
) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export const paymentCycleName = (type: string) => {
  switch (type) {
    case PAYMENT_CYCLE.MONTHLY:
      return 'Monthly';
    case PAYMENT_CYCLE.ANNUALLY:
      return 'Annually';
    case PAYMENT_CYCLE.BI_WEEKLY:
      return 'Bi Weekly';
    case PAYMENT_CYCLE.DAILY:
      return 'Daily';
    default:
      break;
  }
};

export const checkAnyContentSelectedWithTutor = (
  contentIds: contentIdsProps
) => {
  if (contentIds?.[contentType.video]?.isAllSelected) {
    return true;
  }

  if (contentIds?.[contentType.video]?.ids?.length) {
    return true;
  }

  if (contentIds?.[contentType.document]?.isAllSelected) {
    return true;
  }

  if (contentIds?.[contentType.document]?.ids?.length) {
    return true;
  }

  if (contentIds?.[contentType.assignment]?.isAllSelected) {
    return true;
  }

  if (contentIds?.[contentType.assignment]?.ids?.length) {
    return true;
  }

  return false;
};

export const filteredDropDownOptionList = (
  list: any[],
  selectedList: any[]
) => {
  const mapSelectedList = selectedList.length
    ? selectedList.map(({ value }) => value)
    : [];
  return list.filter(item => !mapSelectedList.includes(item.value));
};

export const getSubscriptionType = (paymentCycle: string) => {
  switch (paymentCycle) {
    case subscriptionPaymentCycle.daily:
      return 'Daily';
    case subscriptionPaymentCycle.weekly:
      return 'Weekly';
    case subscriptionPaymentCycle.monthly:
      return 'Monthly';
    case subscriptionPaymentCycle.annually:
      return 'Annually';
    default:
      return 'Days';
  }
};

export const checkContentIsSelected = (
  isContentSelected: boolean,
  selectedContentIds: tutorAndSelectedContent[],
  selectedTutorId: string,
  contentType: string,
  contentId: string,
  allIgnoredContentsIds: string[]
) => {
  if (isContentSelected) {
    const idInIgnoreList = allIgnoredContentsIds?.find(id => id === contentId);

    if (idInIgnoreList) {
      return false;
    }

    return isContentSelected;
  }

  const tutorContents = selectedContentIds.find(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  if (!tutorContents?.tutorId) {
    return false;
  }
  const getContentByContentType = tutorContents?.contentIds?.[contentType];

  if (getContentByContentType?.isAllSelected) {
    const idInContentTypeIgnoreList =
      getContentByContentType.contentTypeIgnoredContentsIds?.find(
        id => id === contentId
      );

    if (idInContentTypeIgnoreList) {
      return false;
    }

    return getContentByContentType?.isAllSelected;
  }
  const contentIdList = getContentByContentType?.ids.filter(
    id => id === contentId
  );

  return !!contentIdList?.length;
};

export const secondToTime = (duration: number) => {
  // Hours, minutes and seconds
  let hrs = ~~(duration / 3600);
  let mins = ~~((duration % 3600) / 60);
  let secs = ~~duration % 60;

  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};

export const isAdmin = (user: userTypes | null) => {
  return user?.roles.includes(userRoles.admin);
};

export const downloadFile = (
  bufferData: any,
  contentType: string,
  fileName: string
) => {
  const blob = new Blob([bufferData], { type: contentType });

  let tempFileName = fileName;

  switch (contentType) {
    case 'application/pdf':
      tempFileName += '.pdf';
      break;

    default:
      break;
  }

  let aTag: any = document.createElement('a');
  document.body.appendChild(aTag);

  aTag.style = 'display: none';
  aTag.href = window.URL.createObjectURL(blob);
  aTag.download = tempFileName;
  aTag.click();

  document.body.removeChild(aTag);
};
