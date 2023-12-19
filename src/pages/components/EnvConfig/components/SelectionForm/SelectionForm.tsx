import { Select, SelectItem } from '@nextui-org/react';
import api from '../../../../../api/api';
import { DeleteIcon } from '../../../../../assets/DeleteIcon';
import { CustomModal } from '../../../CustomModal';
import { useEffect } from 'react';

interface props {
  environmentsList: [];
  configurationsList: [];
  setEnvironmentId: (id: string) => void;
  environmentId: string;
  applicationId: string;
  configurationId: string;
  setConfigurationId: (id: string) => void;
}

export const SelectionForm = ({
  environmentsList,
  configurationsList,
  setEnvironmentId,
  environmentId,
  applicationId,
  configurationId,
  setConfigurationId,
}: props) => {
  console.log('dd', configurationId);
  useEffect(() => {
    setConfigurationId('');
  }, [applicationId]);

  return (
    <>
      <div className="flex gap-3">
        <Select
          label="Select Environment"
          onSelectionChange={(e) => {
            setEnvironmentId(e.currentKey);
          }}
          disallowEmptySelection
        >
          {environmentsList.map((item) => (
            <SelectItem key={item.id} value={environmentId}>
              {item.name}
            </SelectItem>
          ))}
        </Select>

        {environmentId && (
          <>
            <CustomModal
              type="editEnv"
              applicationId={applicationId}
              fetchApplications={() => {}}
              environmentId={environmentId}
            />
            <DeleteIcon
              onClick={async () =>
                await api.deleteEnvironment({ applicationId, environmentId })
              }
              fontSize="2em"
            />
          </>
        )}

        <CustomModal
          fetchApplications={() => {}}
          type="env"
          applicationId={applicationId}
          environmentId={''}
        />
      </div>
      <div className="flex gap-3">
        <Select
          label="Select Configuration"
          onSelectionChange={(e) => {
            setConfigurationId(e.currentKey);
          }}
          isDisabled={!environmentId}
          disallowEmptySelection
        >
          {configurationsList.map((item) => (
            <SelectItem key={item.id} value={configurationId}>
              {item.id}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
};
