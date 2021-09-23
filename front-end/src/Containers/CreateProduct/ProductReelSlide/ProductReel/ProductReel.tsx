import React, { FC, useEffect } from 'react';
import { ImRadioChecked } from 'react-icons/im';

import { ImRadioUnchecked } from 'react-icons/im';

import UseViewFile from '../../../../Hooks/UseViewFile';

import { singleContentType } from '../../../../redux/product/productReducer';

interface ProductReel {
  content: singleContentType;
  setSelectedContent?: Function;
  contentType?: string;
  isSelected: boolean;
  isReelSaved: boolean;
}

const ProductReel:FC<ProductReel> = ({
  content,
  setSelectedContent,
  contentType,
  isSelected,
  isReelSaved,
}) => {
  const { previewImageKey, _id } = content;
  const [s3BucketMethod, url] = UseViewFile();

  useEffect(() => {
    const { bucketName, fileKey } = previewImageKey;

    s3BucketMethod(bucketName, fileKey);
  }, [previewImageKey]);

  return (
    <>
      <div className="addContentScreen--content-wrapper__body-content-item">
        <div className="individualContent">
          <div
            className="individualContent--wrapper"
            style={{
              backgroundImage: `url(${url})`,
            }}
          >
            {!isReelSaved && (
              <div
                className="individualContent--selection"
                onClick={() =>
                  setSelectedContent && setSelectedContent(_id, contentType)
                }
              >
                {isSelected ? (
                  <ImRadioChecked className="icon" />
                ) : (
                  <ImRadioUnchecked className="icon" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReel;
