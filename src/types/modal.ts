export interface ModalState {
  type: string | null; // Modal의 타입
  props: any | null; // Modal에 전달될 props
}

// Modal 상태를 설정하는 함수의 타입
export type ModalSetter = React.Dispatch<React.SetStateAction<ModalState>>;
