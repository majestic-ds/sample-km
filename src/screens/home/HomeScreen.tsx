import React from 'react';
import MainLayout from '../../components/layout/main-layout';
import WorkCard from '../../components/cards/work-card';
import {Priority, Sensitivity} from '../../configs/enums';

export default function HomeScreen() {
  return (
    <MainLayout>
      <WorkCard
        deadline="2024-03-31T10:00:30"
        priority={{
          text: 'High',
          level: Priority.HIGH,
        }}
        sensitivity={{
          text: Sensitivity.TOP_SECRET,
          level: Priority.HIGH,
        }}
      />
      <WorkCard
        deadline="2025-03-29T10:00:30"
        priority={{
          text: 'Low',
          level: Priority.LOW,
        }}
        sensitivity={{
          text: Sensitivity.CONFIDENTIAL,
          level: Priority.MEDIUM,
        }}
      />
      <WorkCard
        deadline="2024-03-29T10:00:30"
        priority={{
          text: 'Medium',
          level: Priority.MEDIUM,
        }}
        sensitivity={{
          text: Sensitivity.PUBLIC,
          level: Priority.LOW,
        }}
      />
    </MainLayout>
  );
}
