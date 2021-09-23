import React from 'react';
import ReactPlayer from 'react-player';

const Preview = ({ uploadType, uploadData }) => {
  return uploadType == 'image' ? (
    <img
      src={uploadData}
      alt="video-preview-image-icon"
      className="icon--video-preview-image"
    />
  ) : uploadType == 'document' ? (
      <img
        src={uploadData}
        alt="video-preview-image-icon"
        className="icon--video-preview-image"
      />
    )
    : (
      <ReactPlayer width="100%" height="auto" controls url={uploadData} />
    );
};

export default Preview;
