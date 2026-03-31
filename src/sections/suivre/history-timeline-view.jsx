import React from 'react';
import { useParams } from 'react-router';

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

import { useGetSuivi } from 'src/actions';

export default function HistoryTimelineView() {
  const { id } = useParams();
  const { suivi, suiviLoading, suiviError } = useGetSuivi(id);

  const historiqueList = (suivi?.historiques || []).sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

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
        {historiqueList.map((item, index) => (
          <Item key={item.id} item={item} lastItem={index === historiqueList.length - 1} />
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
        <Typography variant="subtitle2">{item.status?.nom}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.created_at)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
