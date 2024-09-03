import useModal from '../../../hooks/useModal';
import Button from '../button/Button';
import { DialogProps } from './Dialog.types';

const Dialog = ({
  title,
  subtitle,
  content,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '닫기',
  showSubtitle = true,
}: DialogProps) => {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCancel}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col items-center w-[310px] p-[24px_18px_20px_18px] bg-white rounded-[10px]">
          {showSubtitle ? (
            <div className="w-[282px] rounded-[10px] flex flex-col gap-y-[8px] mb-[8px]">
              <h3 className="text-h3 text-center text-bk-100">{title}</h3>
              <p className="text-body5 text-center text-bk-70 whitespace-pre-line">
                {subtitle}
              </p>
            </div>
          ) : (
            <h3 className="text-h3 text-center text-bk-100 mb-[8px]">
              {title}
            </h3>
          )}
          {content && <div className="mb-[18px]">{content}</div>}
          <div className="flex gap-[16px]">
            <div className="w-[115px] h-[43px]">
              <Button
                size="md"
                color="sub_300"
                shape="square"
                onClick={handleConfirm}
                className="w-full h-full text-btn2"
              >
                {confirmText}
              </Button>
            </div>
            <div className="w-[115px] h-[43px] text-btn2">
              <Button
                size="md"
                color="disabled"
                shape="square"
                onClick={handleCancel}
                className="w-full h-full text-btn2"
              >
                {cancelText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
