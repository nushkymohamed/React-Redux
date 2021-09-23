import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addSelectedItemToArray, sortingArray } from '../../Helper';
import { singleContentType } from '../../redux/common/commonReducer';
import DropdownInput from '../FormInput/DropdownInput';
import Tags from '../FormInput/Tags/Tags';

interface RelatedContentProps {
  relatedDocumentContent: singleContentType[] | null;
  relatedVideoContent: singleContentType[] | null;
  relatedAssignmentContent: singleContentType[] | null;
  Controller: any;
  control: any;
  errors: any;
  setValue: any;
}

const RelatedContent: FC<RelatedContentProps> = ({
  Controller,
  control,
  errors,
  setValue,
  relatedDocumentContent,
  relatedVideoContent,
  relatedAssignmentContent,
}) => {
  const [relatedVideoArray, setRelatedVideoArray] = useState<any[]>([]);
  const [relatedAssessmentArray, setRelatedAssessmentArray] = useState<any[]>(
    []
  );
  const [relatedDocumentArray, setRelatedDocumentArray] = useState<any[]>([]);

  const [defaultRelatedVideo, setDefaultRelatedVideo] = useState<any>(null);
  const [defaultRelatedDocument, setDefaultRelatedDocument] =
    useState<any>(null);
  const [defaultRelatedAssessment, setDefaultRelatedAssessment] =
    useState<any>(null);
  const { t } = useTranslation();

  const generateVideoContents = useMemo(() => {
    if (!relatedVideoContent) {
      return [];
    }

    const optionList = relatedVideoContent.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));

    return sortingArray(optionList);
  }, [relatedVideoContent]);

  const generateDocumentContents = useMemo(() => {
    if (!relatedDocumentContent) {
      return [];
    }

    const optionList = relatedDocumentContent.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));

    return sortingArray(optionList);
  }, [relatedDocumentContent]);

  const generateAssignmentContents = useMemo(() => {
    if (!relatedAssignmentContent) {
      return [];
    }

    const optionList = relatedAssignmentContent.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));

    return sortingArray(optionList);
  }, [relatedAssignmentContent]);

  const filteredList = (list: any[], selectedList: any[]) => {
    const mapSelectedList = selectedList.length
      ? selectedList.map(({ value }) => value)
      : [];
    return list.filter(item => !mapSelectedList.includes(item.value));
  };

  useEffect(() => {
    setDefaultRelatedVideo(null);

    setValue(
      'relatedVideoIds',
      relatedVideoArray.length ? relatedVideoArray.map((a: any) => a.value) : []
    );
  }, [relatedVideoArray]);

  useEffect(() => {
    setDefaultRelatedDocument(null);

    setValue(
      'relatedDocumentIds',
      relatedDocumentArray.length
        ? relatedDocumentArray.map((a: any) => a.value)
        : []
    );
  }, [relatedDocumentArray]);

  useEffect(() => {
    setDefaultRelatedAssessment(null);

    setValue(
      'relatedAssessmentIds',
      relatedAssessmentArray.length
        ? relatedAssessmentArray.map((a: any) => a.value)
        : []
    );
  }, [relatedAssessmentArray]);

  return (
    <>
      <div className="createContent__wrapper">
        <h3 className="createContent__rowtitle">{t('Related Contents')}</h3>
        <div className="createContent__row basic-info noMarginBottom">
          <div className="createContent__column">
            <h3 className="createContent__rowtitle fontColor-white">
              {t('Related Video')}
            </h3>

            <DropdownInput
              Controller={Controller}
              control={control}
              label={t('Related Video')}
              name="relatedVideoIds"
              errorMessage={errors?.relatedVideos?.message}
              placeholder={t('Select Related Video')}
              options={filteredList(generateVideoContents, relatedVideoArray)}
              customOnchangeAction={value => {
                const values: string[] = addSelectedItemToArray(
                  relatedVideoArray,
                  generateVideoContents,
                  value
                );
                setDefaultRelatedVideo(value);
                setRelatedVideoArray([...values]);
              }}
              value={defaultRelatedVideo}
            />

            <Tags
              list={relatedVideoArray}
              tagLabel={'label'}
              listReturnMethod={(list: any) => setRelatedVideoArray(list)}
            />
          </div>

          <div className="createContent__column">
            <h3 className="createContent__rowtitle fontColor-white">
              {t('Assign related assessments')}
            </h3>

            <DropdownInput
              Controller={Controller}
              control={control}
              label={t('Related Assessment')}
              name="relatedAssessmentIds"
              errorMessage={errors?.relatedAssessments?.message}
              placeholder={t('Select Related Assessment')}
              options={filteredList(
                generateAssignmentContents,
                relatedAssessmentArray
              )}
              customOnchangeAction={value => {
                const values: string[] = addSelectedItemToArray(
                  relatedAssessmentArray,
                  generateAssignmentContents,
                  value
                );

                setDefaultRelatedAssessment(value);
                setRelatedAssessmentArray([...values]);
              }}
              value={defaultRelatedAssessment}
            />

            <Tags
              list={relatedAssessmentArray}
              tagLabel={'label'}
              listReturnMethod={(list: any) => setRelatedAssessmentArray(list)}
            />
          </div>

          <div className="createContent__column">
            <h3 className="createContent__rowtitle fontColor-white">
              {t('Assign related documents')}
            </h3>

            <DropdownInput
              Controller={Controller}
              control={control}
              label={t('Related Document')}
              name="relatedDocumentIds"
              errorMessage={errors?.relatedDocuments?.message}
              placeholder={t('Select Related Document')}
              options={filteredList(
                generateDocumentContents,
                relatedDocumentArray
              )}
              customOnchangeAction={value => {
                const values: string[] = addSelectedItemToArray(
                  relatedDocumentArray,
                  generateDocumentContents,
                  value
                );
                setDefaultRelatedDocument(value);
                setRelatedDocumentArray([...values]);
              }}
              value={defaultRelatedDocument}
            />

            <Tags
              list={relatedDocumentArray}
              tagLabel={'label'}
              listReturnMethod={(list: any) => setRelatedDocumentArray(list)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default RelatedContent;
