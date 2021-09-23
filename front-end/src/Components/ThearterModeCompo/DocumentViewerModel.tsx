import React from 'react';
import Modal from '../Modal/Modal';
import PDFViewer from './PDFViewer';
import zoom_in from '../../assets/images/svg-images/icon-zoom2.svg';
import zoom_out from '../../assets/images/svg-images/icon-zoom-out2.svg';
import full_screen from '../../assets/images/svg-images/icon-expand.svg';
import close from '../../assets/images/svg-images/icon-close2.svg';
import document from '../../assets/images/svg-images/icon-document2.svg';
import document_selected from '../../assets/images/svg-images/icon-document-selected.svg';
import info from '../../assets/images/svg-images/icon-info.svg';
import info_selected from '../../assets/images/svg-images/icon-info-selected.svg';
import notes from '../../assets/images/svg-images/icon-notes.svg';
import notes_selected from '../../assets/images/svg-images/icon-notes-selected.svg';
import videoBackground from '../../assets/images/video_ex.png';

const DocumentViewerModel = () => {
  return (
    <Modal
      onClickAway={() => console.log('close')}
      customClassName={'documentPopUp'}
    >
      <div className="documentPopUp__wrapper">
        <div className="documentPopUp__container">
          <h4>Document Title</h4>
          {/* 
          ----------PDF Viewer-------
          */}
          {/* <div className="documentPopUp__section document">
            <div className="documentPopUp__content">
              <div className="documentPopUp__section--buttons">
                <img src={zoom_in} alt="zoom_in-icon" className="icon" />
                <img src={zoom_out} alt="zoom_out-icon" className="icon" />
                <img
                  src={full_screen}
                  alt="full_screen-icon"
                  className="icon"
                />
              </div>
              <div className="documentPopUp__section--title">
                <h3>Document Title</h3>
              </div>
              <div className="documentPopUp__section--body">
                <PDFViewer
                  pdfURL={'https://arxiv.org/pdf/quant-ph/0410100.pdf'}
                />
              </div>
            </div>
            <div className="documentPopUp__section--pagination">Page 1</div>
          </div> */}

           {/* 
          ----------About this document-------
          */}

          {/* <div className="documentPopUp__section about">
            <div className="documentPopUp__content">
              <div className="documentPopUp__section--title">
                <h3>About this document</h3>
              </div>
              <div className="documentPopUp__section--body">
                <div className="documentPopUp__section--details">
                  <div className="documentPopUp__section--details-left">
                    <p>Title:</p>
                    <p>Author:</p>
                    <p>Subject:</p>
                    <p>Topic:</p>
                    <p>Lesson:</p>
                  </div>
                  <div className="documentPopUp__section--details-right">
                    <p>Organic Chemistry 1</p>
                    <p>John Smith</p>
                    <p>Chemistry</p>
                    <p>Organic Chemistry</p>
                    <p>Organic Chemistry 101</p>
                  </div>
                </div>
                <div className="documentPopUp__section--videos">
                  <div className="documentPopUp__section--video-row">
                    <div className="documentPopUp__section--video-header">
                      <h5>Related Videos</h5>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                  </div>
                  <div className="documentPopUp__section--video-row">
                    <div className="documentPopUp__section--video-header">
                      <h5>Related Documents</h5>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                  </div>
                  <div className="documentPopUp__section--video-row">
                    <div className="documentPopUp__section--video-header">
                      <h5>Related Assessments</h5>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                    <div className="documentPopUp__section--video-wrapper">
                      <div
                        className="documentPopUp__section--video"
                        style={{
                          backgroundImage: `url(${videoBackground})`,
                        }}
                      ></div>
                      <div className="documentPopUp__section--video-title">
                        <p>History of the Atom</p>
                      </div>
                      <div className="documentPopUp__section--video-lesson">
                        <p>Models of the Atom</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

            {/* 
          ----------Notes-------
          */}

          <div className="documentPopUp__section notes">
            <div className="documentPopUp__content">
              <div className="documentPopUp__section--title">
                <h3>Notes</h3>
              </div>
              <div className="documentPopUp__section--body">
                <div className="documentPopUp__section--textInputArea">
                  <textarea placeholder="Type here..."></textarea>
                  <button className="btn btn--primary">Submit</button>
                </div>
                <div className="documentPopUp__section--notes">
                  <div className="documentPopUp__section--note">
                    <div className="documentPopUp__section--note-date">
                      28/02/2021
                    </div>
                    <div className="documentPopUp__section--note-content">
                      Omnis iste natus error sit voluptatem accusantium
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                      quia voluptas sit aspernatur aut odit aut fugit
                    </div>
                  </div>
                  <div className="documentPopUp__section--note">
                    <div className="documentPopUp__section--note-date">
                      27/02/2021
                    </div>
                    <div className="documentPopUp__section--note-content">
                      Eaque ipsa quae ab illo inventore veritatis et quasi
                      architecto beatae vitae dicta sunt explicabo. Nemo enim
                      ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                      fugit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="documentPopUp__buttons">
          <div className="documentPopUp__button">
            <img src={close} alt="close-icon" className="icon" />
          </div>
          <div className="documentPopUp__button selected">
            <img src={document} alt="document-icon" className="icon" />
            <img src={document_selected} alt="document-icon" className="icon" />
          </div>
          <div className="documentPopUp__button">
            <img src={info} alt="info-icon" className="icon" />
            <img src={info_selected} alt="info-icon" className="icon" />
          </div>
          <div className="documentPopUp__button">
            <img src={notes} alt="notes-icon" className="icon" />
            <img src={notes_selected} alt="notes-icon" className="icon" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DocumentViewerModel;
