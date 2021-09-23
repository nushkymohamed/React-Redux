import React, { FC, useEffect, useMemo } from 'react';
import useDataBase from '../../../Hooks/useDataBase';
import UseViewFile from '../../../Hooks/UseViewFile';
import {
  s3FileObjectType,
  singleLessonType,
} from '../../../redux/common/commonReducer';

export type DocumentRelatedItemType = {
  previewImageKey: s3FileObjectType;
  _id: string;
  title: string;
  lessonIds: string[];
};

type DocumentRelatedItemProps = {
  item: DocumentRelatedItemType;
};

const DocumentRelatedItem: FC<DocumentRelatedItemProps> = ({ item }) => {
  const { lessonIds, previewImageKey, title } = item;

  const [generateImageURL, imageURL] = UseViewFile();
  const [searchLessons, lessonList] = useDataBase();

  useEffect(() => {
    const { bucketName, fileKey } = previewImageKey || {};
    if (bucketName && fileKey) {
      generateImageURL(bucketName, fileKey);
    }
  }, [previewImageKey]);

  useEffect(() => {
    if (lessonIds.length) {
      searchLessons('lesson', { ids: lessonIds });
    }
  }, [lessonIds]);

  const formattedLessons = useMemo(() => {
    if (lessonList?.length) {
      return (lessonList as singleLessonType[])
        ?.map(lesson => lesson.name)
        ?.join(' / ');
    } else {
      return '';
    }
  }, [lessonList]);

  return (
    <div className="documentPopUp__section--video-wrapper">
      <div
        className="documentPopUp__section--video"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      ></div>
      <div className="documentPopUp__section--video-title">
        <p>{title}</p>
      </div>
      <div className="documentPopUp__section--video-lesson">
        <p>{formattedLessons}</p>
      </div>
    </div>
  );
};

export default DocumentRelatedItem;
