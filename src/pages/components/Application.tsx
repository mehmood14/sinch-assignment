import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Card, Input } from '@nextui-org/react';
import { SearchIcon } from '../../assets/SearchIcon';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../api/autoFaqApi';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { CreateAppModal } from './CreateAppModal';

export const Application = ({ setApplicationId }) => {
  const [searchedText, setSearchedText] = useState<string>('');
  const [applicationsList, setApplicationsList] = useState([]);

  const query = useDebounce<string>(searchedText, 500);

  const fetchApplications = async () => {
    const { data } = await api.getApplications(query);
    setApplicationsList(data);
  };

  useEffect(() => {
    fetchApplications();
  }, [query]);

  const handleDeleteClick = async (id) => {
    await api.deleteApplication(id);
    fetchApplications();
  };

  const handleEditClick = () => {
    return (
      <CreateAppModal
        fetchApplications={fetchApplications}
        type="appEdit"
        applicationId={null}
        environmentId={undefined}
      />
    );
  };

  return (
    <Card className="p-4 gap-3 w-1/3 ">
      <div className="flex gap-2">
        <Input
          classNames={{
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Search Application..."
          size="sm"
          startContent={
            <SearchIcon size={18} width={undefined} height={undefined} />
          }
          type="search"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
        <CreateAppModal
          fetchApplications={fetchApplications}
          type="app"
          applicationId={null}
          environmentId={undefined}
        />
      </div>

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
                <CreateAppModal
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
