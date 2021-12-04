import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import intentManifest from '../data/intent-manifest.json';

import '../styles/globals.scss'

const localTracker = createDefaultTracker({
  intentManifest
});

function MyApp({ Component, pageProps, scoring }) {
  return (
    <UniformTracker trackerInstance={localTracker} initialIntentScores={scoring}>
      <Component {...pageProps} />
    </UniformTracker>
  );
}

export default MyApp
