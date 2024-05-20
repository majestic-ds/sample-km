import React from 'react';
import {
  Text,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  ButtonText,
} from '@gluestack-ui/themed';

interface Props {
  onClose: () => void;
}

export default function AddStatus({onClose}: Props) {
  const ref = React.useRef(null);
  return (
    <Modal isOpen={true} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add Status</Heading>
          <ModalCloseButton onPress={() => onClose()}>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>
            Elevate user interactions with our versatile modals. Seamlessly
            integrate notifications, forms, and media displays. Make an impact
            effortlessly.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => onClose()}
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" action="positive" borderWidth="$0">
            <ButtonText>Explore</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
