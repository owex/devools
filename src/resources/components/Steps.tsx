import React from 'react';

type Props = {
  steps: { id: string; title?: string; code?: string; description?: string }[];
}

const Steps = ({ steps }: Props) => {
  if (!steps) {
    return null;
  }

  return (
    <div className="p-4">
      <ul className="list-disc mt-4 ml-8">
        {steps.map((step) => (
          <li key={`step-${step.id}`}>
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
