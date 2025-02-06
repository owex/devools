import PropTypes from 'prop-types';
import Link from 'next/link';

import Heading from '@/resources/components/Heading';
import { WidgetType } from '@/resources/types/widget.type';

interface Props extends WidgetType {
  children?: React.ReactNode;
  page?: string;
};

const WidgetLayout = ({ title, titleAsHeading, text, children, page }: Props) => {
  /**
   * Returns a heading component wrapped in a link if a page is provided.
   * If no page is specified, returns just the heading component.
   * 
   * @returns {React.ReactNode} A React node that is either a heading 
   *                            wrapped in a link or just a heading.
   */

  const WidgetHeading = (): React.ReactNode => {
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
