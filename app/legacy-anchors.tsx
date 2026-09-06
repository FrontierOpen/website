'use client';

import { useEffect } from 'react';

/** Keep links from the previous homepage useful after the redesign. */
export default function LegacyAnchors() {
  useEffect(() => {
    const hash = window.location.hash;
    if (['#apply', '#commons', '#fit'].includes(hash)) {
      const prefix = window.location.pathname.startsWith('/en') ? '/en' : '';
      window.location.replace(`${prefix}/work#contact`);
    } else if (hash === '#proof') {
      document.getElementById('featured')?.scrollIntoView();
    }
  }, []);
  return null;
}
