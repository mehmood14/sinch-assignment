import { Input } from '@nextui-org/react';
import { SearchIcon } from '../../../assets/SearchIcon';
import { CustomModal } from '../CustomModal';

export const SearchBar = ({
  setSearchedText,
  searchedText,
  fetchApplications,
}) => {
  return (
    <div className="flex gap-2 items-center">
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
      <CustomModal
        fetchApplications={fetchApplications}
        type="app"
        applicationId={undefined}
        environmentId={undefined}
      />
    </div>
  );
};
