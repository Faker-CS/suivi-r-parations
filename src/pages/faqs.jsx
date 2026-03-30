import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SuiviHelpView from 'src/sections/suivre/views/suivi-help-view';

const metadata = { title: `Need help - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SuiviHelpView />
    </>
  );
}
