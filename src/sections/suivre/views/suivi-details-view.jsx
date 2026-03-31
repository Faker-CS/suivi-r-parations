import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';

import { useGetSuivi } from 'src/actions';
import { CompactContent } from 'src/layouts/simple';

import { ContactForm } from '../contact-form';
import DetailsToolbarView from '../details-toolbar-view';
import HistoryTimelineView from '../history-timeline-view';
import CommentsSectionView from '../comments-section-view';

export default function SuiviDetailsView() {
  const { id } = useParams();
  const { suivi } = useGetSuivi(id);

  // Transform information_technique to comments format
  const comments = useMemo(() => {
    if (!Array.isArray(suivi?.information_technique)) return [];

    return suivi.information_technique.map((tech, index) => ({
      id: `tech-${index}`,
      name: 'Information Technique',
      message: tech.text,
      postedAt: tech.date,
      avatarUrl: 'https://api-dev-minimal-v610.pages.dev/assets/images/avatar/avatar-4.webp',
    }));
  }, [suivi?.information_technique]);

  return (
    <CompactContent sx={{ maxWidth: '75%', textAlign: '' }}>
      <DetailsToolbarView />
      <Grid container spacing={3} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid xs={12} md={8} container spacing={3}>
          <Grid xs={12}>
            <CommentsSectionView comments={comments} />
          </Grid>
          <Grid xs={12}>
            <ContactForm />
          </Grid>
        </Grid>

        <Grid xs={12} md={4}>
          <HistoryTimelineView />
        </Grid>
      </Grid>
    </CompactContent>
  );
}
