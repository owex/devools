import PropTypes from 'prop-types';

const Heading = ({ children, level }) => {
  const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const safeHeading = level ? level.toLowerCase() : '';
  const Element = validHeadingLevels.includes(safeHeading) ? safeHeading : 'p';

  return (
    <Element className="mb-3 text-primary dark:text-white text-xl font-semibold font-heading">
      {children}
    </Element>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.string,
};

export default Heading;
