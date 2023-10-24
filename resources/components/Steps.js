import React from 'react';

const Steps = ({ steps }) => {
  if (!steps) {
    return null;
  }

  return (
    <div className="p-4">
      <ul className="list-disc mt-4 ml-8">
        {steps.map((step, index) => (
          <li key={index}>
            <span className="font-semibold">{step.title}:</span>{' '}
            {step.description}
            <pre className="bg-gray-100 p-2 rounded-md">{step.code}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Steps;
