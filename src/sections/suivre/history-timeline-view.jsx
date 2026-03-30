import React from 'react';

import { Card, CardHeader, Typography } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  timelineItemClasses,
} from '@mui/lab';

import { fDateTime } from 'src/utils/format-time';

const list = [
  {
    id: 1,
    title: 'Devis à distance accepté',
    time: '2025-01-15T12:22:52+01:00',
  },
  {
    id: 2,
    title: 'Réparation finis',
    time: '2025-01-13T10:22:52+01:00',
  },
];
export default function HistoryTimelineView() {
  return (
    <Card>
      <CardHeader title="Historique" />
      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

function Item({ item, lastItem, ...other }) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot color="error" />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
