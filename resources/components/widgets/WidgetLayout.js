import PropTypes from 'prop-types';
import Link from 'next/link';

import Heading from '@/components/Heading';

const WidgetLayout = ({ title, titleAsHeading = '', text, children, page }) => {
  const WidgetHeading = () => {
    if (page) {
      return (
        <Link href={page}>
          <Heading level={titleAsHeading}>{title}</Heading>
        </Link>
      );
    }

    return <Heading level={titleAsHeading}>{title}</Heading>;
  };

  return (
    <div className="w-full">
      <div className="mb-3">
        <WidgetHeading />
        <p>{text}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

WidgetLayout.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  page: PropTypes.string,
};

export default WidgetLayout;
