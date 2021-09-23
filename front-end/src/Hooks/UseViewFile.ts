import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';

const UseViewFile = () => {
  const [url, setUrl] = useState<any>('');
  const [s3path, setS3path] = useState<string>();
  const [s3Bucket, setS3Bucket] = useState<string>();
  const [expireTime, setExpireTime] = useState<number>();

  useEffect(() => {
    if (!s3Bucket || !s3path || !expireTime) return;
    let modifiedPath = s3path.charAt(0) === '/' ? s3path.substr(1) : s3path;
    Storage.configure({
      bucket: s3Bucket,
      level: 'public',
      expires: expireTime,
      customPrefix: {
        public: '',
      },
    });
    Storage.get(modifiedPath).then(res => {
      setUrl(res);
    });
  }, [s3path, s3Bucket]);

  const getFromBucket = (
    bucket: string,
    path: string,
    expTime: number = 7200
  ): void => {
    setExpireTime(expTime);
    setS3Bucket(bucket);
    setS3path(path);
  };

  /**
   * Reset only file url
   */
  const resetUrl = () => {
    setUrl('');
  };

  return [getFromBucket, url, resetUrl] as const;
};

export default UseViewFile;
