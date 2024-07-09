import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { projectStorage, projectFirestore, serverTimestamp } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        console.log(percentage); // Log progress to see it in action
      },
      (err) => {
        setError(err);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const createdAt = serverTimestamp();
          await addDoc(collection(projectFirestore, 'images'), {
            url: downloadUrl,
            createdAt: createdAt,
          });
          setUrl(downloadUrl);
        } catch (err) {
          setError(err);
        }
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
