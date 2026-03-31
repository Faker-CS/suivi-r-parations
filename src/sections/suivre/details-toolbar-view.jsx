import React from 'react';
import { useParams } from 'react-router';

import { Stack, Button, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { useGetSuivi } from 'src/actions';

import { Iconify } from 'src/components/iconify';

export default function DetailsToolbarView() {
  const { id } = useParams();
  const { suivi } = useGetSuivi(id);


  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <IconButton component={RouterLink} href={paths.suivi.root}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4"> Suivi {suivi?.id_table}</Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {fDateTime(suivi?.updated_at)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        flexGrow={1}
        flexWrap="wrap"
        spacing={1.5}
        direction="row"
        alignItems="center"
        sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}
      >
        <Button color="inherit" variant="outlined" sx={{ textTransform: 'capitalize' }}>
          Rapport technique
        </Button>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="mingcute:arrow-left-line" />}
        >
          Avant
        </Button>

        <Button
          color="inherit"
          variant="contained"
          endIcon={<Iconify icon="mingcute:arrow-right-line" />}
        >
          Aprés
        </Button>
        <Button color="info" variant="contained" startIcon={<Iconify icon="mdi:file" />}>
          Devis
        </Button>
      </Stack>
    </Stack>
  );
}
