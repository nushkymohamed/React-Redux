import React from 'react';
import { FC } from 'react';

interface NoContentProps {
  message?: string;
}

const NoContent: FC<NoContentProps> = ({ message = 'No Content Found' }) => {
  return <div className="noContent">{message}</div>;
};

export default NoContent;
