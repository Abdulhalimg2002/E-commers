import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogPositioner,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ isOpen, closeModal, children, title }: IProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) closeModal();
      }}
    >
      <DialogBackdrop />

      <DialogPositioner
        alignItems="center"
        justifyContent="center"
      >
        <DialogContent
          bg="gray.800"
          borderRadius="xl"
          maxW="md"
          w="full"
        >
          <DialogHeader color="white">{title}</DialogHeader>
          <DialogCloseTrigger color="white" />
          <DialogBody>{children}</DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog.Root>
  );
};

export default Modal;
