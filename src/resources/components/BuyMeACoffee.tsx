'use client';

import { useEffect } from 'react';

const BuyMeACoffee = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const div = document.getElementById('supportByBMC') as HTMLElement | null;

    if (div) {
      script.setAttribute(
        'src',
        'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
      );
      script.setAttribute('data-name', 'BMC-Widget');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-id', 'owenr');
      script.setAttribute('data-description', 'Support me on Buy me a coffee!');
      script.setAttribute(
        'data-message',
        'Help Support Devools by buying me a coffee!'
      );
      script.setAttribute('data-color', '#5F7FFF');
      script.setAttribute('data-position', 'Right');
      script.setAttribute('data-x_margin', '18');
      script.setAttribute('data-y_margin', '18');

      script.onload = function () {
        // Use the newer Event constructor
        const evt = new Event('DOMContentLoaded', { bubbles: false, cancelable: false });
        window.dispatchEvent(evt);
      };

      div.appendChild(script);
    }
  }, []);

  return <div id="supportByBMC"></div>;
};

export default BuyMeACoffee;
