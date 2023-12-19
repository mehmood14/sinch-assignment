import React, { useMemo, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import api from '../../api/autoFaqApi';
import { EditIcon } from '../../assets/EditIcon';

export const CreateAppModal = ({
  fetchApplications,
  type,
  applicationId,
  environmentId,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: '',
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onFormValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const saveApplication = async () => {
    if (type === 'env') {
      await api.postEnvironment(formData, applicationId);
    }
    if (type === 'editEnv') {
      await api.putEnvironment(formData, applicationId, environmentId);
      onClose();
      return;
    }
    if (type === 'editApp') {
      await api.putApplication(formData, applicationId);
    }
    if (type === 'app') {
      await api.postApplication(formData);
    }
    fetchApplications();
    onClose();
  };

  const checkType = useMemo(() => {
    if (type === 'app') return 'description';
    return 'region';
  }, []);

  return (
    <>
      {type === 'editApp' || type === 'editEnv' ? (
        <EditIcon
          onClick={() => onOpen()}
          fontSize={type === 'editEnv' ? '2em' : '1.5em'}
        />
      ) : (
        <Button onPress={onOpen} isIconOnly>
          +
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {type === 'editApp' || type === 'editEnv' ? 'Edit ' : 'New '}
                {type === 'app' ? 'Application' : 'Environment'}
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  onChange={onFormValueChange}
                />
                <Input
                  type="text"
                  name={checkType}
                  label={checkType}
                  onChange={onFormValueChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onPress={saveApplication}
                  // isDisabled={!formData.name || !formData.description}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
