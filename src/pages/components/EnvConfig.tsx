import { Select, SelectItem } from '@nextui-org/select';
import { JsonView } from '.';
import { useEffect, useState } from 'react';
import { Button, Card } from '@nextui-org/react';
import { DeleteIcon } from '../../assets/DeleteIcon';
import api from '../../api/autoFaqApi';
import { CreateAppModal } from './CreateAppModal';
import { AddNewJson } from './AddNewJson';

export const EnvConfig = ({
  environmentsList,
  configurationsList,
  setEnvironmentId,
  environmentId,
  applicationId,
}) => {
  const [configurationId, setConfigurationId] = useState<string>('');

  useEffect(() => {
    setConfigurationId('');
  }, [applicationId]);

  if (!applicationId) {
    return (
      <Card className="w-2/3 flex justify-center items-center text-gray-400">
        Please Select Application
      </Card>
    );
  }

  const deleteEnviornment = async (id) => {
    await api.deleteEnvironment({ applicationId, id });
  };

  console.log('cong', configurationsList);

  return (
    <Card className="w-2/3 flex items-center flex-col p-4">
      <div className="flex flex-col w-full gap-4 m-4">
        <div className="flex gap-3">
          <Select
            label="Select Environment"
            onSelectionChange={setEnvironmentId}
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
              <CreateAppModal
                type="editEnv"
                applicationId={applicationId}
                fetchApplications={undefined}
                environmentId={environmentId}
              />
              <DeleteIcon
                onClick={() => deleteEnviornment(item.id)}
                fontSize="2em"
              />
            </>
          )}

          <CreateAppModal
            fetchApplications={() => {}}
            type="env"
            applicationId={applicationId}
            environmentId={undefined}
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

        <JsonView
          configurationId={configurationId}
          configurationsList={configurationsList.length}
          applicationId={applicationId}
          environmentId={environmentId}
        />
      </div>
    </Card>
  );
};
