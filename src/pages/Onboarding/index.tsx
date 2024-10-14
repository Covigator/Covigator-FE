import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/button/Button';
import ProgressBar from '../../components/onboarding/ProgressBar';
import {
  onboardingOptions,
  onboardingQuestions,
} from '../../constants/onboardingOption';

import { v4 as uuid } from 'uuid';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const handleOptionClick = (option: string) => {
    console.log(`선택한 옵션: ${option}`);
    if (currentStep < onboardingOptions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('이제 코스를 짜러 같이 떠나볼까요?');
      navigate('/');
    }
  };

  const currentOptions = onboardingOptions[currentStep - 1].options;
  const currentQuestion = onboardingQuestions[currentStep - 1];

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col items-center mt-[53px]">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={onboardingOptions.length}
        />
        <div className="mt-[151px] text-btn1 mb-[134px]">{currentQuestion}</div>
        {currentOptions &&
          currentOptions.map((option) => (
            <div key={uuid()} className={'mb-[34px]'}>
              <Button
                onClick={() => handleOptionClick(option)}
                shape="rounded"
                size="lg"
                color="sub"
              >
                {option}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
