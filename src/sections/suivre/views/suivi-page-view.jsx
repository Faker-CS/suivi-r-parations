import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Alert, Snackbar, Typography, CardActions, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { postSuiviHash } from 'src/actions';
import { CompactContent } from 'src/layouts/simple';

import { Form, Field } from 'src/components/hook-form';

export const SuivreSchema = zod.object({
  serie: zod.string().min(1, { message: 'Numéro de série est requis!' }),
});
export default function SuiviPageView() {
  const route = useRouter();
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

  const showToast = (message, severity = 'error') => {
    setToast({ open: true, message, severity });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await postSuiviHash(data.serie);

      const notFound =
        !res ||
        res?.found === false ||
        res?.exists === false ||
        res?.status === 404 ||
        (Array.isArray(res?.data) && res.data.length === 0);

      if (notFound) {
        showToast('Aucune reparation trouvee avec cette reference.');
        return;
      }

      route.replace(paths.suivi.details(data.serie));
    } catch (error) {
      const rawMessage =
        (typeof error === 'string' && error) ||
        error?.message ||
        error?.error ||
        error?.detail ||
        '';

      if (/404|not\s*found|introuvable|aucune/i.test(rawMessage)) {
        showToast('Aucune reparation trouvee avec cette reference.');
        return;
      }

      showToast('Une erreur est survenue. Veuillez reessayer.');
    }
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
              loading={isSubmitting}
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
