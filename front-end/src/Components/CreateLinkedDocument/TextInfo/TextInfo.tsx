import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from './Editor';

interface textInfoProps {
  Controller: any;
  control: any;
  errors?: any;
  register?: any;
  setValue: any;
  values?: any;
  setError?: any;
  clearErrors?: any;
}

const TextInfo: FC<textInfoProps> = ({
  Controller,
  control,
  errors,
  register,
  setValue,
  values,
  setError,
  clearErrors,
}) => {
  const { t } = useTranslation();

  const [subSectionCount, setSubSectionCount] = useState(0);
  const [formUpdate, setFormUpdate] = useState(false);

  type subSectionType = {
    heading: string;
    body: string;
    key?: string;
  };

  const subSection: subSectionType = {
    heading: '',
    body: '',
    key: Date.now().toString(),
  };

  type initialDataType = {
    heading: string;
    body: string;
    subSections: subSectionType[];
    key?: string;
  };

  const initialData: initialDataType = {
    heading: '',
    body: '',
    subSections: [],
    key: Date.now().toString(),
  };

  const [sectionData, setSectionData] = useState([initialData]);

  const onHandle = (field: string, text: string) => {
    setValue(field, text);
  };

  const addSection = () => {
    sectionData.push(initialData);
    setSectionData([...sectionData]);
  };

  const addSubSection = (index: number) => {
    let newData = [...sectionData];
    newData[index].subSections = [
      ...sectionData[index].subSections,
      subSection,
    ];
    setSectionData(newData);
    setSubSectionCount(prevState => prevState + 1);
  };

  const removeSection = (index: number) => {
    if (sectionData.length > 1) {
      let subCount = sectionData[index].subSections.length;
      sectionData.splice(index, 1);
      setSectionData([...sectionData]);
      setSubSectionCount(prevState => prevState - subCount);
    }
  };
  const removeSubSection = (index: number, subIndex: number) => {
    if (sectionData.length > 0) {
      sectionData[index].subSections.splice(subIndex, 1);
      setSectionData([...sectionData]);
      setSubSectionCount(prevCount => prevCount - 1);
    }
  };

  const updateData = (
    sectionKey: string | undefined,
    subKey: string | null | undefined,
    field: keyof subSectionType,
    value: any
  ) => {
    let updatedData = [...sectionData];

    updatedData.map(section => {
      if (section.key === sectionKey) {
        if (subKey) {
          section?.subSections?.map(sub => {
            if (sub.key === subKey) {
              sub[field] = value;
            }
            return sub;
          });
        } else {
          section[field] = value;
        }
      }
      return section;
    });

    setSectionData(updatedData);
    setFormUpdate(true);
  };

  useEffect(() => {
    if (!formUpdate) return;

    let modifiedData: initialDataType[] = JSON.parse(
      JSON.stringify(sectionData)
    );

    modifiedData = modifiedData.map(section => {
      section?.key && delete section.key;
      section?.subSections?.map(sub => {
        sub?.key && delete sub.key;
        return sub;
      });
      return section;
    });

    setValue('sections', modifiedData);
    setFormUpdate(false);
  }, [formUpdate]);

  const handleErrors = (
    field: string,
    value: string | undefined | null,
    errorMessage: string | undefined
  ) => {
    if (value) {
      clearErrors(field);
    } else if (errorMessage) {
      setError(field, { message: errorMessage });
    }
  };

  return (
    <>
      <div className="createContent__row wrap normalSpacing">
        <div className="createContent__column">
          <h3 className="createContent__rowtitle">{t('Upload Contents')}</h3>
          <div className="createContent__background-wrap">
            <div className="countTile">Number Of Section</div>
            <div className="count">{sectionData.length}</div>
          </div>
        </div>
        <div className="createContent__column">
          <div className="createContent__background-wrap pushDown">
            <div className="countTile">Number Of Sub-Section</div>
            <div className="count">{subSectionCount}</div>
          </div>
        </div>
      </div>
      <div className="createContent__column fullWidth background">
        <div className="form fullWidth no-spacing">
          <Controller
            control={control}
            name={`sections`}
            render={() => {
              return sectionData.map((section, index) => {
                return (
                  <div key={section.key} className="createContent__wysiwyg">
                    <div className="createContent__wysiwyg--header">
                      {sectionData.length > 1 && (
                        <a
                          onClick={() => removeSection(index)}
                          className="btn-close closemodale"
                          aria-hidden="true"
                        >
                          &times;
                        </a>
                      )}
                      <div className={'form__form--field'}>
                        <label>
                          {t('Heading')} <span>*</span>
                        </label>
                        <input
                          className={'form-input'}
                          type={`text`}
                          placeholder={t('Enter Document Heading')}
                          name={`heading${index}`}
                          onChange={e => {
                            handleErrors(
                              `heading${index}`,
                              e?.target?.value,
                              t('Heading cannot be empty')
                            );
                            updateData(
                              section.key,
                              null,
                              'heading',
                              e?.target?.value
                            );
                          }}
                        />
                        <span className="error">
                          {errors?.[`heading${index}`]?.message || ''}
                        </span>
                      </div>
                    </div>
                    <div className="createContent__wysiwyg--body">
                      <label>{t('Body')}</label>
                      <Editor
                        output={(value: string) =>
                          updateData(section.key, null, 'body', value)
                        }
                      />
                    </div>
                    <div className="createContent__wysiwyg--section">
                      {section?.subSections?.map((sub, subIndex) => (
                        <div className="createContent subSection" key={sub.key}>
                          <div className="createContent wysiwyg--header">
                            <div className={'form__form--field'}>
                              <label>
                                {t('Sub - Heading')} <span>*</span>
                              </label>
                              <input
                                className={'form-input'}
                                type={`text`}
                                placeholder={t('Enter Document Heading')}
                                name={`heading${index}subheading${subIndex}`}
                                onChange={e => {
                                  handleErrors(
                                    `heading${index}subheading${subIndex}`,
                                    e?.target?.value,
                                    t('Heading cannot be empty')
                                  );
                                  updateData(
                                    section.key,
                                    sub.key,
                                    'heading',
                                    e?.target?.value
                                  );
                                }}
                              />
                              <span className="error">
                                {errors[`heading${index}subheading${subIndex}`]
                                  ?.message || ''}
                              </span>
                            </div>
                            <a
                              onClick={() => removeSubSection(index, subIndex)}
                              className="btn-close closemodale"
                              aria-hidden="true"
                            >
                              &times;
                            </a>
                          </div>
                          <div className="createContent wysiwyg--body">
                            <label>{t('Body')}</label>

                            <div className="">
                              <Editor
                                output={(value: string) =>
                                  updateData(
                                    section.key,
                                    sub.key,
                                    'body',
                                    value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => addSubSection(index)}
                        className="btn-section sub"
                        type="button"
                      >
                        Add Sub Section
                      </button>
                    </div>
                  </div>
                );
              });
            }}
          />
        </div>
      </div>
      <div className="createContent__wysiwyg--section no-spacing">
        <button onClick={addSection} className="btn-section" type="button">
          Add Section
        </button>
      </div>
    </>
  );
};
export default TextInfo;
