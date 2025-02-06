import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react';

const Switch = ({ onChange, enabled = false, text = 'Toggle' }: { onChange: (value: boolean) => void, enabled?: boolean, text?: string }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleChange = (val: boolean) => {
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
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{text}</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  )
}

Switch.propTypes = {
  enabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default Switch
