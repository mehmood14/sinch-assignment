import { EnvConfig, Application } from './components';
import { useApi } from '../hooks/useApi';

export const Dashboard = () => {
  const {
    environmentsList,
    configurationsList,
    setApplicationId,
    setEnvironmentId,
    environmentId,
    applicationId,
    loading,
  } = useApi();

  return (
    <div className="h-screen flex flex-col">
      <p className="p-4 text-center   dark:bg-default-500/20">
        Sinch Configuration Manager
      </p>
      <div className="flex h-full gap-6 p-10">
        <Application
          setApplicationId={(id: string) => {
            setApplicationId(id);
          }}
        />
        <EnvConfig
          environmentsList={environmentsList}
          configurationsList={configurationsList}
          environmentId={environmentId}
          applicationId={applicationId}
          loading={loading}
          setEnvironmentId={(e) => {
            setEnvironmentId(e);
          }}
        />
      </div>
    </div>
  );
};
