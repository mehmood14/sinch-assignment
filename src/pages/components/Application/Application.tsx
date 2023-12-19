import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Card } from '@nextui-org/react';
import { DeleteIcon } from '../../../assets/DeleteIcon';
import { useApplication } from './hooks';
import { CustomModal } from '../CustomModal';
import { SearchBar } from './SearchBar';

interface Props {
  setApplicationId: (id: string) => void;
}

export const Application = ({ setApplicationId }: Props) => {
  const {
    fetchApplications,
    handleDeleteClick,
    applicationsList,
    setSearchedText,
    searchedText,
  } = useApplication();

  return (
    <Card className="p-4 gap-3 w-1/3">
      <SearchBar
        setSearchedText={(text: string) => setSearchedText(text)}
        searchedText={searchedText}
        fetchApplications={fetchApplications}
      />

      <Listbox
        items={applicationsList}
        onAction={(key) => setApplicationId(key)}
        className="overflow-auto"
        selectionMode="single"
        disallowEmptySelection
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            endContent={
              <>
                <CustomModal
                  fetchApplications={fetchApplications}
                  type="editApp"
                  applicationId={item.id}
                  environmentId={undefined}
                />

                <DeleteIcon
                  onClick={() => handleDeleteClick(item.id)}
                  fontSize="1.5em"
                />
              </>
            }
          >
            {item.name}
          </ListboxItem>
        )}
      </Listbox>
    </Card>
  );
};
