import React, { memo } from 'react';
import {
  singleReelSubjectTypes,
  SubjectsReducerType,
} from '../../redux/subjects/subjectsReducer';
import ContentSliderContainer from './ContentSliderContainer';
import TutorsReelContainer from './TutorsReelContainer';

interface ContentSliderWrapperProps {
  reels: SubjectsReducerType['subjects'];
  urlParams: any;
}

const ContentSliderWrapper = memo(
  ({ reels, urlParams }: ContentSliderWrapperProps) => {
    let styleObject = {};

    const reelList = reels?.map((reel: singleReelSubjectTypes, i: number) => {
      return (
        <>
          <ContentSliderContainer
            key={`content-${reel._id}`}
            reel={reel}
            itemKey={i}
            urlParams={urlParams}
          />

          <TutorsReelContainer
            key={`tutor-${reel._id}`}
            reel={reel}
            itemKey={i}
          />
        </>
      );
    });

    // Set background image
    return (
      <section className="home-screen" style={styleObject}>
        {reelList}
      </section>
    );
  }
);

export default ContentSliderWrapper;
