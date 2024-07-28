import React, { useState, ReactNode } from 'react';

import { ModalState, ModalSetter } from '../types/modal';

interface ModalProviderProps {
  children: ReactNode;
}

// Modal의 현재 상태를 저장
export const ModalStateContext = React.createContext<ModalState | undefined>(
  undefined,
);

// Modal 상태를 변경하는 함수를 저장
export const ModalSetterContext = React.createContext<ModalSetter | undefined>(
  undefined,
);

const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [state, setState] = useState<ModalState>({
    type: null,
    props: null,
  });

  return (
    <ModalSetterContext.Provider value={setState}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
};

export default ModalProvider;
