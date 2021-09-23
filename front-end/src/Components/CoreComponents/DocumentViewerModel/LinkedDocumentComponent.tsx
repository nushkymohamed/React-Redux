import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { sectionsType } from '../../../redux/Theater/TheaterReducer';

interface propsType {
  sections: sectionsType[];
  title: string;
}

type ViewerProps = {
  value: string;
  heading: string;
};

const Viewer: FC<ViewerProps> = ({ value, heading }) => {
  const defaultModules = {
    toolbar: [],
  };

  return (
    <>
      <h3 style={{ color: 'black' }}>{heading}</h3>
      <ReactQuill
        theme="snow"
        value={value}
        readOnly
        modules={defaultModules}
      />
    </>
  );
};

const LinkedDocumentComponent: FC<propsType> = ({ sections, title }) => {
  const { t } = useTranslation();

  return (
    <div className="documentPopUp__container">
      <h4>{title}</h4>
      <div className="documentPopUp__section document">
        <div className="documentPopUp__content">
          <div className="documentPopUp__section--title">
            <h3>{title}</h3>
          </div>
          <div className="documentPopUp__section--body">
            {sections.map(section => (
              <>
                <Viewer value={section.body} heading={section.heading} />;
                {section?.subSections?.map(subsection => (
                  <Viewer
                    value={subsection.body}
                    heading={subsection.heading}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkedDocumentComponent;
