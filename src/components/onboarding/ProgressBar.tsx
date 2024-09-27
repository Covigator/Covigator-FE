import { useEffect, useState } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const progress = (currentStep / totalSteps) * 100;
    setWidth(progress);
  }, [currentStep, totalSteps]);

  return (
    <div className="w-full h-1 bg-bk-30">
      <div
        className="h-full bg-primary-300 transition-all duration-300 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
