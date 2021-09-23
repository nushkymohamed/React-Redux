import TimeAgo from 'javascript-time-ago';
// English.
import en from 'javascript-time-ago/locale/en';
import React, { FC } from 'react';
import { singleNotification } from '../../redux/notifications/NotificationReducer';
interface NotificationCardProps {
  notification: singleNotification;
  onClickCard?: Function;
}
const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  onClickCard,
}) => {
  const { title, message, reminderDate, seen, userNotificationType } =
    notification;

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo();

  return (
    <div className={`notifications__item ${seen ? 'seen' : 'notSeen'}`}>
      <div className="notifications__item--title">
        <p>{title}</p> <span>{userNotificationType}</span>
      </div>
      <div className="notifications__item--description">
        <p>{message}</p>
        {reminderDate && (
          <span>{timeAgo.format(new Date(reminderDate))}</span>
        )}
      </div>
      {onClickCard && (
        <div
          onClick={() => onClickCard && onClickCard()}
          className="notifications__item--notification"
        ></div>
      )}
    </div>
  );
};
export default NotificationCard;
