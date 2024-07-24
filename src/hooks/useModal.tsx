import { useContext } from 'react';

import { ModalSetterContext } from '../context/ModalProvider';
import { ModalState } from '../types/modal';

const useModal = () => {
  const setModalState = useContext(ModalSetterContext);

  // ModalProvider 외부에서 useModal이 사용되는 경우
  if (!setModalState) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  // Modal을 열기 위한 함수
  // props에 옵셔널 체이닝 적용
  const openModal = ({
    type,
    props = null,
  }: Omit<ModalState, 'props'> & { props?: any }) => {
    setModalState({ type, props });
  };

  // Modal을 닫기 위한 함수
  const closeModal = () => {
    setModalState({ type: null, props: null });
  };

  return { openModal, closeModal };
};

export default useModal;
