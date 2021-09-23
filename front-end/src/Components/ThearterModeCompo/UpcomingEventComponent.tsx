import React, { FC } from 'react';

interface UpcomingEventComponentProps {
  isSelect?: boolean;
}
const UpcomingEventComponent: FC<UpcomingEventComponentProps> = ({
  isSelect = false,
}) => {
  const generateDate = (index: number) => {
    const today = new Date();

    today.setDate(new Date().getDate() + index);
    return today.getDate();
  };

  const days = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <div
        style={{
          width: 400,
          height: 400,
          background: '#333',
          padding: '10px',
          marginBottom: 12,
        }}
      >
        <div>
          <p>Upcoming events</p>
          <p>October 1</p>

          <p>Future Minds Expo</p>
          <p>2020</p>
          <p>
            Content...... Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 50,
          width: 400,
          borderRadius: 25,
          background: '#333',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {days.map((d: any, index: number) => {
          return (
            <div
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                background: 'blue',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 4,
                cursor: 'pointer',
              }}
            >
              {generateDate(index)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UpcomingEventComponent;
