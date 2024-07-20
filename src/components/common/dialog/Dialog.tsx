import Button from '../button/Button';
import { DialogProps } from './Dialog.types';

const Dialog: React.FC<DialogProps> = ({
  title,
  subtitle,
  content,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '닫기',
  showSubtitle = false,
}) => {
  return (
    <div className="flex flex-col items-center w-[310px] p-[24px_18px_20px_18px] bg-white rounded-[10px]">
      {showSubtitle ? (
        <div className="w-[282px] rounded-[10px] flex flex-col gap-y-[8px] mb-[8px]">
          <h3 className="text-[18px] leading-[26px] text-center text-bk-100">
            {title}
          </h3>
          <p className="text-[14px] leading-[20px] text-center text-bk-70">
            {subtitle}
          </p>
        </div>
      ) : (
        <h3 className="text-[18px] leading-[26px] text-center text-bk-100 mb-[8px]">
          {title}
        </h3>
      )}
      {content && <div className="mb-[18px]">{content}</div>}
      <div className="flex gap-[16px]">
        <Button
          size="md"
          onClick={onConfirm}
          className="bg-sub-300 border rounded-xl font-semibold"
        >
          {confirmText}
        </Button>
        <Button
          size="md"
          color="disabled"
          onClick={onCancel}
          className="border rounded-xl font-semibold"
        >
          {cancelText}
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
