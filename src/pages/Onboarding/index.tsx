import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/button/Button';
import ProgressBar from '../../components/onboarding/ProgressBar';
import {
  onboardingOptions,
  onboardingQuestions,
} from '../../constants/onboardingOption';
import { useTravelStyle } from '../../hooks/api/useMypage';
import { travelStyleRequest } from '../../types/auth';

import { v4 as uuid } from 'uuid';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [requestOptionList, setRequestOptionList] =
    useState<travelStyleRequest>({
      gender: '',
      area_type: '',
      familiarity: '',
      activity_type: '',
      planning_type: '',
      photo_priority: '',
      popularity: '',
    });
  const fieldOrder = [
    'gender',
    'generation',
    'area_type',
    'familiarity',
    'activity_type',
    'popularity',
    'planning_type',
    'photo_priority',
  ] as const;

  const { mutate, isSuccess } = useTravelStyle(requestOptionList);

  const [currentStep, setCurrentStep] = useState(1);

  const handleOptionClick = (option: string) => {
    const fieldToUpdate = fieldOrder[
      currentStep - 1
    ] as keyof travelStyleRequest;

    setRequestOptionList((prev) => ({
      ...prev,
      [fieldToUpdate]: option,
    }));

    if (currentStep < onboardingOptions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (
      currentStep === onboardingOptions.length &&
      requestOptionList.photo_priority.length > 0
    ) {
      console.log(requestOptionList);
      console.log(requestOptionList.photo_priority);
      mutate();
      if (isSuccess) {
        alert('이제 코스를 짜러 같이 떠나볼까요?');
        navigate('/');
      }
    }
  }, [requestOptionList]);

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
                onClick={() => handleOptionClick(option.value)}
                shape="rounded"
                size="lg"
                color="sub"
              >
                {option.label}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
