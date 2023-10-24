import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react';

const Switch = ({onChange, enabled = false, text = 'Toggle'}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleChange = (val) => {
    setIsEnabled(val);
    onChange(val);
  }

  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  return (
    <HeadlessSwitch
      checked={isEnabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{text}</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  )
}

Switch.propTypes = {
  enabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Switch
