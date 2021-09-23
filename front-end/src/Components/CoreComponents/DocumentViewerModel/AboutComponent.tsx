import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { contentType } from '../../../config/constants';
import { VideoContent } from '../../../redux/student/reelVideoReducer';
import { DocumentsType } from '../../../redux/Theater/TheaterReducer';
import { DocumentRelatedItemType } from './DocumentRelatedItem';
import DocumentRelatedItemSection from './DocumentRelatedItemSection';

interface AboutPropsType {
  author: string;
  lesson: string;
  relatedAssessments: any[];
  relatedDocuments: DocumentsType[];
  relatedVideos: VideoContent[];
  subject: string;
  title: string;
  topic: string;
}
const AboutComponent: FC<AboutPropsType> = ({
  author = '',
  lesson = '',
  relatedAssessments = [],
  relatedDocuments = [],
  relatedVideos = [],
  subject = '',
  title = '',
  topic = '',
}) => {
  const { t } = useTranslation();

  const videoItems: DocumentRelatedItemType[] = useMemo(() => {
    return relatedVideos.map(({ _id, title, previewImageKey, lessons }) => {
      return {
        _id,
        title,
        previewImageKey,
        lessonIds: lessons?.map(l => l._id) || [],
      };
    });
  }, [relatedVideos]);
  const assessmentItems: DocumentRelatedItemType[] = useMemo(() => {
    return relatedAssessments.map(
      ({ _id, title, previewImageKey, lessons }) => {
        return {
          _id,
          title,
          previewImageKey,
          lessonIds: lessons?.map((l: any) => l._id) || [],
        };
      }
    );
  }, [relatedAssessments]);
  const documentItems: DocumentRelatedItemType[] = useMemo(() => {
    return relatedDocuments.map(
      ({ _id, title, previewImageKey, lessonIds }) => {
        return {
          _id,
          title,
          previewImageKey,
          lessonIds,
        };
      }
    );
  }, [relatedDocuments]);

  return (
    <div className="documentPopUp__container">
      <h4>{title}</h4>
      <div className="documentPopUp__section about">
        <div className="documentPopUp__content">
          <div className="documentPopUp__section--title">
            <h3>{t('About this document')}</h3>
          </div>
          <div className="documentPopUp__section--body">
            <div className="documentPopUp__section--details">
              <div className="documentPopUp__section--details-left">
                <p>{t('Title')}:</p>
                <p>{t('Author')}:</p>
                <p>{t('Subject')}:</p>
                <p>{t('Topic')}:</p>
                <p>{t('Lesson')}:</p>
              </div>
              <div className="documentPopUp__section--details-right">
                <p>{title || '-'}</p>
                <p>{author || '-'}</p>
                <p>{subject || '-'}</p>
                <p>{topic || '-'}</p>
                <p>{lesson || '-'}</p>
              </div>
            </div>
            <div className="documentPopUp__section--videos">
              {videoItems?.length ? (
                <DocumentRelatedItemSection
                  sectionTitle={'Related Videos'}
                  items={videoItems}
                  itemType={contentType.video}
                />
              ) : null}
              {documentItems?.length ? (
                <DocumentRelatedItemSection
                  sectionTitle={'Related Documents'}
                  items={documentItems}
                  itemType={contentType.document}
                />
              ) : null}
              {assessmentItems?.length ? (
                <DocumentRelatedItemSection
                  sectionTitle={'Related Assessments'}
                  items={assessmentItems}
                  itemType={contentType.linkedDocument}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutComponent;
