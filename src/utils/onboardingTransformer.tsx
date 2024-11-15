// onboardingTransformer.ts
export const transformAgeToGroup = (generation: string): string => {
  const ageMap: Record<string, string> = {
    YOUNG_ADULT: '10~20',
    MIDDLE_AGED: '30~40',
    SENIOR: '50~60',
  };
  return ageMap[generation] || '20~30';
};

export const transformGender = (gender: string): string => {
  return gender === 'MALE' ? '남' : '여';
};

export const transformTravelStyle = (
  areaType: string,
  familiarity: string,
  activityType: string,
  popularity: string,
  planningType: string,
  photoPriority: string,
): Record<string, string> => {
  return {
    TRAVEL_STYL_1: transformStyleValue(areaType),
    TRAVEL_STYL_2: transformStyleValue(familiarity),
    TRAVEL_STYL_3: transformStyleValue(activityType),
    TRAVEL_STYL_4: transformStyleValue(popularity),
    TRAVEL_STYL_5: transformStyleValue(planningType),
    TRAVEL_STYL_6: transformStyleValue(photoPriority),
  };
};

const transformStyleValue = (value: string): string => {
  if (value === 'BOTH') return '3';
  return value === 'NATURE' ||
    value === 'NEW' ||
    value === 'REST' ||
    value === 'NOT_WIDELY_KNOWN' ||
    value === 'PLANNED' ||
    value === 'NOT_IMPORTANT'
    ? '1'
    : '2';
};
