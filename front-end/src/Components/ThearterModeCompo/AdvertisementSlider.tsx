import React, { FC, useState } from 'react';
import Button from '../Button/Button';

const AdvertisementSlider = () => {
  return (
    <div style={{ background: '#433', padding: '12px 30px' }}>
      {/* Slider will add */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <img
            src="https://picsum.photos/id/237/500/400"
            alt="avatar-icon"
            className="dark-icon icon--avatar"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 30px',
          }}
        >
          <h2>Introduction to the Periodic Table</h2>
          <p>History and Formate of the Periodic Table of the Elements</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Button type="button" className="btn btn--primary">
              Watch now
            </Button>
            <Button type="button" className="btn btn--secondary">
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSlider;
