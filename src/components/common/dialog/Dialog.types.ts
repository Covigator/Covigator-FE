import { ReactNode } from 'react';

export type DialogProps = {
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  showSubtitle?: boolean;
};
