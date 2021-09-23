import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortingArray } from '../../../Helper';
import { CommonTypes } from '../../../redux/common/commonReducer';
import DropdownInput from '../../FormInput/DropdownInput';

interface DocumentInformationProps {
  Controller: any;
  control: any;
  documents: CommonTypes['learningDocuments'];
  setValue: any;
  linkedDocuments: CommonTypes['learningLinkedDocuments'];
  selectedTutor: string | null;
  selectedTopic: string | null;
  selectedSubject: string | null;
}

const DocumentInformation: FC<DocumentInformationProps> = ({
  Controller,
  control,
  documents,
  linkedDocuments,
  setValue,
  selectedTutor,
  selectedTopic,
  selectedSubject,
}) => {
  const { t } = useTranslation();

  const [documentsArray, setDocumentsArray] = useState<string[]>([]);
  const [defaultDocuments, setDefaultDocuments] = useState<any>(null);

  const [linkedDocumentsArray, setLinkedDocumentsArray] = useState<string[]>(
    []
  );
  const [defaultLinkedDocuments, setDefaultLinkedDocuments] =
    useState<any>(null);

  useEffect(() => {
    setDefaultDocuments(null);

    setValue(
      'documentIds',
      documentsArray?.map((document: any) => document.value) || null
    );
  }, [documentsArray]);

  useEffect(() => {
    setDocumentsArray([]);
    setLinkedDocumentsArray([]);
  }, [selectedTutor, selectedTopic, selectedSubject]);

  useEffect(() => {
    setDefaultLinkedDocuments(null);

    setValue(
      'linkedDocumentIds',
      linkedDocumentsArray.length
        ? linkedDocumentsArray.map((a: any) => a.value)
        : null
    );
  }, [linkedDocumentsArray]);

  const filterObjectBySelectedValue = (array: any[], value: string) => {
    return array.filter((item: { value: string }) => item.value === value);
  };

  const generateDocuments = useMemo(() => {
    if (!documents) {
      setDefaultDocuments(null);
      return [];
    }

    const optionList = documents.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));

    return sortingArray(optionList);
  }, [documents]);

  const generateLinkedDocuments = useMemo(() => {
    if (!linkedDocuments) {
      setDefaultLinkedDocuments(null);
      return [];
    }

    const optionList = linkedDocuments.map(({ _id, title }) => ({
      value: _id,
      label: title,
    }));

    return sortingArray(optionList);
  }, [linkedDocuments]);

  const addSelectedItemToArray = (state: any, array: any[], value: string) => {
    if (!state.filter((item: { value: any }) => item.value === value).length) {
      const filteredArray = filterObjectBySelectedValue(array, value);
      filteredArray?.length && state.push(filteredArray[0]);
    }

    return state;
  };

  const removeObjectFromArray = (
    arrayIndex: number,
    array: any[],
    callback: any
  ) => {
    array.splice(arrayIndex, 1);

    callback([...array]);
  };

  const filteredDocumentsList = (
    documentList: any[],
    selectedDocumentList: any[]
  ) => {
    const mapSelectedList = selectedDocumentList.map(({ value }) => value);
    return documentList.filter(item => !mapSelectedList.includes(item.value));
  };

  return (
    <>
      <div className="createContent__column">
        <div className="form">
          <h3 className="createContent__rowtitle">{t('Upload Documents')}</h3>
          <DropdownInput
            Controller={Controller}
            control={control}
            label={t('Documents')}
            name="documentIds"
            placeholder={t('Select Document')}
            options={filteredDocumentsList(generateDocuments, documentsArray)}
            customOnchangeAction={value => {
              const values: string[] = addSelectedItemToArray(
                documentsArray,
                generateDocuments,
                value
              );
              setDefaultDocuments(value);
              setDocumentsArray([...values]);
            }}
            value={defaultDocuments}
          />

          <div className="form__form--field">
            <div className="form__form--field dropdown-selection dropdown-tags">
              {documentsArray.map((item: any, index) => {
                return (
                  <p
                    className="form__form--field dropdown-selected"
                    key={index}
                  >
                    {item.label}
                    <a
                      className="btn-close closemodale"
                      aria-hidden="true"
                      onClick={() =>
                        removeObjectFromArray(
                          index,
                          documentsArray,
                          setDocumentsArray
                        )
                      }
                    >
                      &times;
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="createContent__column">
        <div className="form">
          <h3 className="createContent__rowtitle">
            {t('Upload Linked Document')}
          </h3>

          <DropdownInput
            Controller={Controller}
            control={control}
            label={t('Linked Document')}
            name="linkedDocumentIds"
            placeholder={t('Select Linked Document')}
            options={filteredDocumentsList(
              generateLinkedDocuments,
              linkedDocumentsArray
            )}
            customOnchangeAction={value => {
              const values: string[] = addSelectedItemToArray(
                linkedDocumentsArray,
                generateLinkedDocuments,
                value
              );
              setDefaultLinkedDocuments(value);
              setLinkedDocumentsArray([...values]);
            }}
            value={defaultLinkedDocuments}
          />

          <div className="form__form--field">
            <div className="form__form--field dropdown-selection dropdown-tags">
              {linkedDocumentsArray.map((item: any, index) => {
                return (
                  <p
                    className="form__form--field dropdown-selected"
                    key={index}
                  >
                    {item.label}
                    <a
                      className="btn-close closemodale"
                      aria-hidden="true"
                      onClick={() =>
                        removeObjectFromArray(
                          index,
                          linkedDocumentsArray,
                          setLinkedDocumentsArray
                        )
                      }
                    >
                      &times;
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentInformation;
