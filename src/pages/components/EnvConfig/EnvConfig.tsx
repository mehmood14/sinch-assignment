import { useState } from 'react';
import { Card } from '@nextui-org/react';
import { JsonView, SelectionForm } from './components';

interface ConfigProps {
  environmentsList: [];
  configurationsList: [];
  setEnvironmentId: (id: string) => void;
  environmentId: string;
  applicationId: string;
}

export const EnvConfig = ({
  environmentsList,
  configurationsList,
  setEnvironmentId,
  environmentId,
  applicationId,
}: ConfigProps) => {
  const [configurationId, setConfigurationId] = useState<string>('');

  if (!applicationId) {
    return (
      <Card className="w-2/3 flex justify-center items-center text-gray-400">
        Please Select Application
      </Card>
    );
  }

  return (
    <Card className="w-2/3 flex items-center flex-col p-4">
      <div className="flex flex-col w-full gap-4 m-4">
        <SelectionForm
          environmentsList={environmentsList}
          configurationsList={configurationsList}
          setEnvironmentId={(id: string) => setEnvironmentId(id)}
          environmentId={environmentId}
          applicationId={applicationId}
          configurationId={configurationId}
          setConfigurationId={(id: string) => setConfigurationId(id)}
        />
        <JsonView
          configurationId={configurationId}
          configurationsListLength={configurationsList.length}
          applicationId={applicationId}
          environmentId={environmentId}
        />
      </div>
    </Card>
  );
};
