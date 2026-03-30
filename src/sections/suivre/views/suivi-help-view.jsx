import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Alert, Snackbar, Typography, CardActions, CardContent } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { CompactContent } from 'src/layouts/simple';

import { Form, Field } from 'src/components/hook-form';

const HelpSchema = zod.object({
  name: zod.string().min(1, { message: 'Nom requis!' }),
  email: zod.string().email({ message: 'Email invalide!' }),
  reference: zod.string().min(1, { message: 'Reference requise!' }),
  message: zod.string().min(10, { message: 'Message trop court (min 10 caracteres)!' }),
});

export default function SuiviHelpView() {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const defaultValues = {
    name: '',
    email: '',
    reference: '',
    message: '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(HelpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async () => {
    try {
      reset(defaultValues);
      setToast({
        open: true,
        message: 'Votre demande a ete envoyee. Nous vous repondrons rapidement.',
        severity: 'success',
      });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: 'Une erreur est survenue. Veuillez reessayer.',
        severity: 'error',
      });
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

            <Typography sx={{ mb: 1.5 }} variant="h4">
              Besoin d&apos;aide pour votre reparation ?
            </Typography>

            <Typography sx={{ mb: 3 }} variant="body2" color="text.secondary">
              Partagez votre reference de suivi et votre message, notre equipe vous assistera au
              plus vite.
            </Typography>

            <Box display="grid" gap={2}>
              <Field.Text name="name" label="Nom complet" />
              <Field.Text name="email" label="Adresse email" />
              <Field.Text name="reference" label="Numero de suivi" helperText="Exemple: FFFFFFF" />
              <Field.Text name="message" label="Votre message" multiline minRows={4} />
            </Box>
          </CardContent>

          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              fullWidth
              color="primary"
            >
              Envoyer ma demande
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
