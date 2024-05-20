import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {API} from '../../utils/api';
import {Button, ButtonText, Text, set} from '@gluestack-ui/themed';
import {Spinner} from '@gluestack-ui/themed';
interface Props {
  onFileSelect?: (fileName: string) => any;
}
const FilePicker = ({onFileSelect}: Props) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const [loading, setLoading] = useState(false);

  const selectFile = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],

        // type: [DocumentPicker.types.allFiles],
      });
      //   @ts-ignore
      setFile(result[0]);
      uploadFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error(err);
      }
      setLoading(false);
    }
  };

  //   @ts-ignore
  const uploadFile = async file => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      const response = await axios.post(API('/file'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onFileSelect && onFileSelect(response.data.data.filename);
      setLoading(false);

      setUploadStatus('File uploaded successfully');
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to upload file');
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={selectFile}>
        <ButtonText>Selected Primary Document</ButtonText>
      </Button>
      {loading && <Spinner size="small" />}
      {/*@ts-ignore */}
      {file && <Text>Selected File: {file?.name}</Text>}
      {uploadStatus && <Text>{uploadStatus}</Text>}
    </>
  );
};

export default FilePicker;
