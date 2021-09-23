import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';

const useFileUpload = () => {
  const [s3FileObject, setS3FileObject] = useState<any>();
  const [uploadingFile, setUploadingFile] = useState<any>(null);
  const [s3path, setS3path] = useState<string>('');
  const [s3Bucket, setS3Bucket] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (uploadingFile && s3Bucket !== '' && s3path !== '') {
      const trimmedPath = s3path.charAt(0) === '/' ? s3path.substr(1) : s3path;
      const sanitizedFileName = uploadingFile?.name
        .split('.')
        .slice(0, -1)
        .join('_')
        .replace(/\W/g, '');
      const fileExtension = uploadingFile?.name.split('.').pop();
      Storage.configure({
        bucket: s3Bucket,
        level: 'public',
        customPrefix: {
          public: '',
        },
      });

      Storage.put(
        `${trimmedPath}${Date.now()}-${sanitizedFileName}.${fileExtension}`,
        uploadingFile,
        {
          contentType: uploadingFile.type,
          progressCallback(progress: any) {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            setUploadProgress(percentageProgress);
          },
        }
      )
        .then((result: object) => setS3FileObject(result))
        .catch(err => {
          console.log(err);
        });

      setUploadingFile(null);
    }
  }, [uploadingFile, s3path, s3Bucket]);

  const submitForm = (file: any, path: string, bucket: string) => {
    setUploadingFile(file);
    setS3Bucket(bucket);
    setS3path(path);
  };

  return [submitForm, s3FileObject, uploadProgress];
};

export default useFileUpload;
