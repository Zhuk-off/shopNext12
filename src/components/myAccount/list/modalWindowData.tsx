import { ModalWindowType } from '@/src/interfaces/account/account.interface';
import { Dialog, Transition } from '@headlessui/react';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
} from 'react';
import ModalName from './modalWindows/modalName';
import ModalPassword from './modalWindows/modalPassword';
import ModalPhone from './modalWindows/modalPhone';
import ModalEmail from './modalWindows/modalEmail';
import ModalAddress from './modalWindows/modalAddress';

function ModalWindowData(
  {
    setIsOpen,
    ModalWindowType,
  }: {
    ModalWindowType: ModalWindowType;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  },
  ref: React.Ref<HTMLDivElement>
) {
  function closeModal() {
    setIsOpen(false);
  }
  const renderModal = () => {
    switch (ModalWindowType) {
      case 'NAME':
        // return <p ref={ref}>test NAME</p>;
        return <ModalName closeModal={closeModal} ref={ref} />;
      case 'EMAIL':
        // return <p ref={ref}>test EMAIL</p>;
        return <ModalEmail closeModal={closeModal} ref={ref} />;
      case 'PASSWORD':
        // return <p ref={ref}>test PASSWORD</p>;
        return <ModalPassword closeModal={closeModal} ref={ref} />;
      case 'PHONE':
        // return <p ref={ref}>test PHONE</p>;
        return <ModalPhone closeModal={closeModal} ref={ref} />;
      case 'ADDRESS':
        // return <p ref={ref}>test ADDRESS</p>;
        return <ModalAddress closeModal={closeModal} ref={ref} />;
      default:
        return null;
    }
  };
  return renderModal();
}

export default forwardRef<
  HTMLDivElement,
  {
    ModalWindowType: ModalWindowType;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }
>(ModalWindowData);
