import React from 'react';
import AdvertisementSlider from '../Components/ThearterModeCompo/AdvertisementSlider';
import DocumentViewerModel from '../Components/ThearterModeCompo/DocumentViewerModel';
import FilterModel from '../Components/ThearterModeCompo/FilterModel';
import SubjectCard from '../Components/ThearterModeCompo/SubjectCard';
import UpcomingEventComponent from '../Components/ThearterModeCompo/UpcomingEventComponent';

const TestPage = () => {
  return (
    <>
      <div className="container">
        <h1>TEST MODEL</h1>

        <DocumentViewerModel />

        {/* <FilterModel/>  */}
        {/* 
        <AdvertisementSlider />

        <SubjectCard />
        <SubjectCard isSelect={true} />
        <br /> */}

        {/*  Upcoming events KND-344*/}
        {/* <UpcomingEventComponent/> */}
      </div>
    </>
  );
};

export default TestPage;
