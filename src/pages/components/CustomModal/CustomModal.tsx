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
  Spinner,
} from '@nextui-org/react';
import api from '../../../api/api';
import { EditIcon } from '../../../assets/EditIcon';
import { AddNoteIcon } from '../../../assets/AddIcon';

interface props {
  applicationId: string;
  environmentId: string;
  type: string;
  fetchApplications: () => void;
}

export const CustomModal = ({
  fetchApplications,
  type,
  applicationId,
  environmentId,
}: props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: '',
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const onFormValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const saveApplication = async () => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
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
        <AddNoteIcon onClick={() => onOpen()} fontSize="2em" />
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
                  isLoading={isLoading}
                  // isDisabled={!formData.name || !formData.description}
                >
                  Save
                </Button>

                {/* {loading && <Spinner />} */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
