import { Select, SelectItem } from '@nextui-org/react';
import api from '../../../../../api/api';
import { DeleteIcon } from '../../../../../assets/DeleteIcon';
import { CustomModal } from '../../../CustomModal';
interface props {
  environmentsList: [];
  configurationsList: [];
  setEnvironmentId: (id: string) => void;
  environmentId: string;
  applicationId: string;
  configurationId: string;
  setConfigurationId: (id: string) => void;
  loading: boolean;
}

export const SelectionForm = ({
  environmentsList,
  configurationsList,
  setEnvironmentId,
  environmentId,
  applicationId,
  configurationId,
  setConfigurationId,
  loading,
}: props) => {
  const deleteEnv = async () => {
    try {
      await api.deleteEnvironment({
        applicationId,
        environmentId,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <Select
          label="Select Environment"
          onSelectionChange={(e) => {
            setEnvironmentId(e.currentKey);
          }}
          disallowEmptySelection
          isLoading={loading}
        >
          {environmentsList.map((item) => (
            <SelectItem key={item.id} value={environmentId}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
        <div className="flex items-center gap-2">
          {environmentId && (
            <>
              <CustomModal
                type="editEnv"
                applicationId={applicationId}
                fetchApplications={() => {}}
                environmentId={environmentId}
              />
              <DeleteIcon onClick={deleteEnv} fontSize="2em" />
            </>
          )}

          <CustomModal
            fetchApplications={() => {}}
            type="env"
            applicationId={applicationId}
            environmentId={''}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Select
          label="Select Configuration"
          onSelectionChange={(e) => {
            setConfigurationId(e.currentKey);
          }}
          isDisabled={!environmentId}
          disallowEmptySelection
          isLoading={loading}
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
