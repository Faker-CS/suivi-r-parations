import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SuiviPageView from 'src/sections/suivre/views/suivi-page-view';

const metadata = { title: `Suivi - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SuiviPageView />
    </>
  );
}
