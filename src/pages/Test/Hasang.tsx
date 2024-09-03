import React from 'react';

import Button from '../../components/common/button/Button';
import Dialog from '../../components/common/dialog/Dialog';
import { ModalStateContext } from '../../context/ModalProvider';
import useModal from '../../hooks/useModal';

const Hasang = () => {
  const { openModal } = useModal();
  const modalState = React.useContext(ModalStateContext);

  const handleOpenDialog = () => {
    openModal({
      type: 'Dialog',
      props: {
        title: 'Test',
        subtitle: 'subTitle Test',
        content: 'Dialog test용입니다.',
        onConfirm: () => {
          console.log('확인');
        },
        onCancel: () => {
          console.log('취소');
        },
      },
    });
  };

  return (
    <div className="w-full p-4">
      <Button
        onClick={handleOpenDialog}
        size={'xs'}
        shape={'square'}
        color={'sub'}
      >
        Dialog Test
      </Button>
      {modalState?.type === 'Dialog' && (
        <Dialog
          title={modalState.props.title}
          subtitle={modalState.props.subtitle}
          content={modalState.props.content}
          onConfirm={modalState.props.onConfirm}
          onCancel={modalState.props.onCancel}
        />
      )}
    </div>
  );
};

export default Hasang;
