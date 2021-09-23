import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TheatreSummary from '../../Containers/TheaterMode/SummaryContainer';
import {
  DocumentsType,
  TheaterContent,
} from '../../redux/Theater/TheaterReducer';
import CustomSlider from '../TheaterVideoComponents/SubjectSlider/CustomSlider';
import ResourceCart from '../TheaterVideoComponents/SubjectSlider/ResourceCart';
import SubjectCard from '../TheaterVideoComponents/SubjectSlider/SubjectCard';

type TheaterSliderProps = {
  content: TheaterContent | null;
  getSummaryStartTime: (data: any) => void;
  downloadSummery: () => void;
  onClickDocument: (data: DocumentsType) => void;
  linkedDocuments: DocumentsType[];
  documents: DocumentsType[];
};

const TheaterSlider: FC<TheaterSliderProps> = ({
  content,
  getSummaryStartTime,
  downloadSummery,
  onClickDocument,
  linkedDocuments,
  documents,
}) => {
  const { t } = useTranslation();

  const dummySubjects = [2, 3, 46, 76, 7, 8, 9, 9, 9, 3, 46, 76, 7, 8, 9, 9, 9];
  const dummyData = [2, 3, 46, 76];
  const [isAbout, setIsAbout] = useState<boolean>(true);
  return (
    <div className="theaterMode__info">
      <div className="theaterMode__info--wrapper">
        <div className="theaterMode__info--options">
          <div className="theaterMode__info--buttons">
            <a>{t("What you'll learn")}</a>
            <a
              onClick={() => setIsAbout(true)}
              className={`${isAbout && 'theaterMode__info--buttonSelected'}`}
            >
              {t('About')}
            </a>
            <a
              onClick={() => setIsAbout(false)}
              className={`${!isAbout && 'theaterMode__info--buttonSelected'}`}
            >
              {t('Resources')}
            </a>
          </div>
        </div>
      </div>
      <TheatreSummary
        getSummaryStartTime={getSummaryStartTime}
        downloadSummery={downloadSummery}
      />
      <>
        {isAbout ? (
          <div className="theaterMode__info--descriptionArea">
            <div className="theaterMode__info--descriptionArea-info">
              <h4>{content?.title}</h4>
              <p>{content?.description || t('No Description Available')}</p>
            </div>

            <div className="theaterMode__info--descriptionArea-reels">
              <h3>Chemistry by marx</h3>
              <CustomSlider dataLength={dummySubjects.length}>
                {dummySubjects.map((product, index: number) => {
                  return (
                    <div key={index}>
                      <SubjectCard />
                    </div>
                  );
                })}
              </CustomSlider>
            </div>

            <div className="theaterMode__info--descriptionArea-reels">
              <h3>Atomic structure introduction</h3>
              <CustomSlider dataLength={dummyData.length}>
                {dummyData.map((product, index: number) => {
                  return (
                    <div key={index}>
                      <div>
                        <SubjectCard />
                        <div className="theaterMode__info--descriptionArea-reels-item__author">
                          <div
                            className="theaterMode__info--descriptionArea-reels-item__author--avatar"
                            style={{
                              backgroundImage: `url("https://picsum.photos/id/237/300/200")`,
                            }}
                          ></div>
                          <div className="theaterMode__info--descriptionArea-reels-item__author--name">
                            <p>Vipis</p>
                            <p>Kingston</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CustomSlider>
            </div>
          </div>
        ) : (
          <>
            <div className="theaterMode__info--descriptionArea-resources">
              <div className="theaterMode__info--descriptionArea-resources__row">
                <h4>{t('Documents')}</h4>
                <div className="theaterMode__resource--wrapper">
                  {documents?.map((document, index: number) => {
                    return (
                      <div key={index}>
                        <ResourceCart
                          type={'document'}
                          document={document}
                          onClickDocument={() => onClickDocument(document)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="theaterMode__info--descriptionArea-resources__row">
                <h4>{t('Linked Documents')}</h4>
                <div className="theaterMode__resource--wrapper">
                  {linkedDocuments?.map((document, index: number) => {
                    return (
                      <div key={index}>
                        <ResourceCart
                          type={'linkedDocument'}
                          document={document}
                          onClickDocument={() => onClickDocument(document)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 
              //! TODO commented for next sprint
              */}
              {/* <div className="theaterMode__info--descriptionArea-resources__row">
                <h4>{t('Personal Documents')}</h4>
                <div className="theaterMode__resource--wrapper">
                  {documents?.map((document, index: number) => {
                    return (
                      <div key={index}>
                        <ResourceCart
                          type={'document'}
                          document={document}
                          onClickDocument={() => onClickDocument(document)}
                        />
                      </div>
                    );
                  })}
                  <DocumentUploader />
                </div>
              </div> */}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default TheaterSlider;
