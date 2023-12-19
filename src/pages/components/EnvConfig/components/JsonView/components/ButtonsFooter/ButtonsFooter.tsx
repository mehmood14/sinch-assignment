import { Button } from '@nextui-org/react';

interface props {
  isActive: boolean;
  configurationsListLength: number;
  duplicate: boolean;
  activateConfiguration: () => void;
  addConfiguration: () => void;
  setDuplicate: (value: boolean) => void;
}

export const ButtonsFooter = ({
  configurationsListLength,
  activateConfiguration,
  isActive,
  addConfiguration,
  duplicate,
  setDuplicate,
}: props) => {
  return (
    <div className="flex justify-end gap-2">
      {configurationsListLength > 0 && (
        <Button onClick={activateConfiguration} isDisabled={isActive}>
          {isActive ? 'Already active' : 'Activate'}
        </Button>
      )}

      {duplicate || !configurationsListLength ? (
        <Button onClick={addConfiguration}>Add Config</Button>
      ) : (
        <Button onClick={() => setDuplicate(true)}>Edit & Duplicate</Button>
      )}
    </div>
  );
};
