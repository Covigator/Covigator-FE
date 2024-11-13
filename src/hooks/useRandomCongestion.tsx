import { useState } from 'react';

export default const useRandomCongestion = () => {
  const [congestion] = useState(() => {
    const congestionLevels = ['매우 혼잡할', '혼잡할', '혼잡하지 않을'];
    const randomIndex = Math.floor(Math.random() * congestionLevels.length);
    return congestionLevels[randomIndex];
  });

  return congestion;
};


