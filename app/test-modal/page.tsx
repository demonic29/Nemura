'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function TestModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Test Modal</ModalHeader>
              <ModalBody>
                <p className="bg-black">If you can see this, NextUI is working!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}