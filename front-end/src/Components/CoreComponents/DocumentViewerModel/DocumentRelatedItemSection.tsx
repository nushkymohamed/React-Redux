import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { contentType } from '../../../config/constants';
import DocumentRelatedItem, {
  DocumentRelatedItemType,
} from './DocumentRelatedItem';

type DocumentRelatedItemSectionProps = {
  sectionTitle: string;
  items: DocumentRelatedItemType[];
  itemType?: string;
};

const DocumentRelatedItemSection: FC<DocumentRelatedItemSectionProps> = ({
  items,
  sectionTitle,
  itemType,
}) => {
  return (
    <div className="documentPopUp__section--video-row">
      <div className="documentPopUp__section--video-header">
        <h5>{sectionTitle}</h5>
      </div>
      {/* 
      //TODO need to fix the link routing
      */}
      {items.map(item => (
        <Link
          to={{
            pathname:
              itemType === contentType.video ? `/theater/${item._id}` : '',
            state: {
              internalRoute: true,
            },
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DocumentRelatedItem item={item} key={item._id} />
        </Link>
      ))}
    </div>
  );
};

export default DocumentRelatedItemSection;
