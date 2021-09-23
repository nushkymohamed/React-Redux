import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { singleLessonType } from '../redux/common/commonReducer';
import {
  DataBaseCountry,
  DataBaseGrade,
  DataBaseSubject,
  DataBaseSyllabus,
  DataBaseTopic,
} from '../redux/dataBase/dataBaseReducer';
import { RootStore } from '../redux/store';

interface optionsTypes {
  ids?: string[];
  list?: boolean;
}

const useDataBase = () => {
  const { hierarchy } = useSelector((state: RootStore) => state.dataBase);

  const [data, setData] = useState<
    | DataBaseCountry[]
    | DataBaseGrade[]
    | DataBaseSubject[]
    | DataBaseSyllabus[]
    | DataBaseTopic[]
    | singleLessonType[]
    | null
  >(null);
  const [options, setOptions] = useState<optionsTypes | null>();
  const [key, setKey] = useState<string | null>();

  const getListOfSyllabus = (hierarchy: DataBaseCountry) => {
    return hierarchy?.syllabuses || [];
  };

  const getListOfGrades = (hierarchy: DataBaseCountry) => {
    return getListOfSyllabus(hierarchy)
      .map(({ grades }) => grades || [])
      .flat();
  };

  const getListOfSubjects = (hierarchy: DataBaseCountry) => {
    return getListOfGrades(hierarchy)
      .map(({ subjects }) => subjects || [])
      .flat();
  };

  const getListOfTopic = (hierarchy: DataBaseCountry) => {
    return getListOfSubjects(hierarchy)
      .map(({ topics }) => topics || [])
      .flat();
  };

  const getListOfLesson = (hierarchy: DataBaseCountry) => {
    return getListOfTopic(hierarchy)
      .map(({ lessons }) => lessons || [])
      .flat();
  };

  const commonFilterById = <T extends { _id: string }>(
    lists: T[],
    ids: string[]
  ): T[] => {
    return lists?.filter(item => ids.includes(item._id)) || ([] as T[]);
  };

  const filterSyllabusById = (hierarchy: DataBaseCountry, ids: string[]) => {
    return commonFilterById(getListOfSyllabus(hierarchy) || [], ids);
  };

  const filterGradeById = (hierarchy: DataBaseCountry, ids: string[]) => {
    return commonFilterById(getListOfGrades(hierarchy) || [], ids);
  };

  const filterSubjectById = (hierarchy: DataBaseCountry, ids: string[]) => {
    return commonFilterById(getListOfSubjects(hierarchy) || [], ids);
  };

  const filterTopicById = (hierarchy: DataBaseCountry, ids: string[]) => {
    return commonFilterById(getListOfTopic(hierarchy) || [], ids);
  };

  const filterLessonById = (hierarchy: DataBaseCountry, ids: string[]) => {
    return commonFilterById(getListOfLesson(hierarchy) || [], ids);
  };

  useEffect(() => {
    let filteredData;
    const { ids, list } = options || {};
    if (hierarchy && ids && key) {
      switch (key) {
        case 'syllabus':
          filteredData = filterSyllabusById(hierarchy || {}, ids);
          break;

        case 'grade':
          filteredData = filterGradeById(hierarchy || {}, ids);
          break;

        case 'subject':
          filteredData = filterSubjectById(hierarchy || {}, ids);
          break;

        case 'topic':
          filteredData = filterTopicById(hierarchy || {}, ids);
          break;

        case 'lesson':
          filteredData = filterLessonById(hierarchy || {}, ids);
          break;

        default:
          break;
      }
    } else if (hierarchy && list && key) {
      switch (key) {
        case 'syllabus':
          filteredData = getListOfSyllabus(hierarchy || {});
          break;

        case 'grade':
          filteredData = getListOfGrades(hierarchy || {});
          break;

        case 'subject':
          filteredData = getListOfSubjects(hierarchy || {});
          break;

        case 'topic':
          filteredData = getListOfTopic(hierarchy || {});
          break;

        case 'lesson':
          filteredData = getListOfLesson(hierarchy || {});
          break;

        default:
          break;
      }
    }

    setData(filteredData || null);
  }, [hierarchy, options, key]);

  const searchData = (
    key: 'syllabus' | 'grade' | 'subject' | 'lesson' | 'topic',
    options: optionsTypes
  ) => {
    setData(null);
    setOptions(options);
    setKey(key);
  };

  return [searchData, data] as const;
};
export default useDataBase;
