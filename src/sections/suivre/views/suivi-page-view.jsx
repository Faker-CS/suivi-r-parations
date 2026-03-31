import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Alert, Snackbar, Typography, CardActions, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetSuivi } from 'src/actions';
import { CONFIG } from 'src/config-global';
import { CompactContent } from 'src/layouts/simple';

import { Form, Field } from 'src/components/hook-form';

export const SuivreSchema = zod.object({
  serie: zod.string().min(1, { message: 'Numéro de série est requis!' }),
});
export default function SuiviPageView() {
  const route = useRouter();
  const [searchSerie, setSearchSerie] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const defaultValues = { serie: '' };
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SuivreSchema),
    defaultValues,
  });

  // Call the hook with the current search serie
  const { suivi, suiviLoading, suiviError } = useGetSuivi(searchSerie);

  const showToast = (message, severity = 'error') => {
    setToast({ open: true, message, severity });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Effect to handle the response after data is fetched
  useEffect(() => {
    if (searchSerie && !suiviLoading) {
      const notFound =
        !suivi ||
        suivi?.found === false ||
        suivi?.exists === false ||
        suivi?.status === 404 ||
        (Array.isArray(suivi) && suivi.length === 0);

      if (suiviError) {
        const rawMessage =
          (typeof suiviError === 'string' && suiviError) ||
          suiviError?.message ||
          suiviError?.error ||
          suiviError?.detail ||
          '';

        if (/404|not\s*found|introuvable|aucune/i.test(rawMessage)) {
          showToast('Aucune reparation trouvee avec cette reference.');
        } else {
          showToast('Une erreur est survenue. Veuillez reessayer.');
        }
        setSearchSerie(null);
      } else if (notFound) {
        showToast('Aucune reparation trouvee avec cette reference.');
        setSearchSerie(null);
      } else {
        // Success - navigate to details page
        route.replace(paths.suivi.details(searchSerie));
      }
    }
  }, [searchSerie, suivi, suiviLoading, suiviError, route]);

  const onSubmit = handleSubmit((data) => {
    setSearchSerie(data.serie);
  });
  return (
    <CompactContent>
      <Form methods={methods} onSubmit={onSubmit}>
        <Card>
          <CardContent>
            <Box
              alt="Full logo"
              component="img"
              src={`${CONFIG.assetsDir}/logo/oneSuivi.png`}
              width="100%"
              height="100%"
            />
            <Typography sx={{ mb: 2 }} variant="h4">
              Plate-forme de suivie pour vos réparations smartphone et informatique.
            </Typography>
            <Field.Text
              name="serie"
              label="Numéro de suivi"
              helperText="Veuillez entrer votre numéro de suivi afin de suivre votre réparation en cours"
            />
          </CardContent>
          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || suiviLoading}
              fullWidth
              color="primary"
            >
              Valider
            </LoadingButton>
          </CardActions>
        </Card>
      </Form>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </CompactContent>
  );
}
