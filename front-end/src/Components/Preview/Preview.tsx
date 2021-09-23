import React, { useState, memo } from 'react';
import ReactPlayer from 'react-player';

type PreviewProps = { uploadType: string; uploadData: any };

const Preview: React.FC<PreviewProps> = ({ uploadType, uploadData }) => {
  return uploadType == 'image' ? (
    <img
      src={uploadData}
      alt="video-preview-image-icon"
      className="icon--video-preview-image"
    />
  ) : (
    <ReactPlayer width="100%" height="auto" controls url={uploadData} />
  );
};

export default Preview;
