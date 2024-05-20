import {View, Text} from 'react-native';
import React from 'react';
import {PDFViewer} from '../../components/pdf-viewer';

interface Props {
  route: {
    params: {
      uri: string;
    };
  };
}

export default function ViewPDFPage({route}: any) {
  return <PDFViewer uri={route.params.uri} />;
}
