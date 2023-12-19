import { useEffect, useMemo, useState } from 'react';
import api from '../../../../../../api/api';

interface props {
  applicationId: string;
  environmentId: string;
  configurationId: string;
}

export const useJsonView = ({
  applicationId,
  configurationId,
  environmentId,
}: props) => {
  const [isValid, setIsValid] = useState(true);
  const [jsonText, setJsonText] = useState('');
  const [duplicate, setDuplicate] = useState(false);

  const fetchData = async () => {
    const { data } = await api.getConfigurationJson(configurationId);
    setJsonText(JSON.stringify(data));
  };

  useEffect(() => {
    if (!configurationId) return;
    fetchData();
  }, [configurationId]);

  useEffect(() => {
    setJsonText('');
    setDuplicate(false);
  }, [applicationId, environmentId, configurationId]);

  const isActive = useMemo(() => {
    if (duplicate) return true;
    if (!jsonText || !jsonText.includes('active')) return false;

    const { active } = JSON.parse(jsonText);

    return active;
  }, [jsonText, duplicate]);

  const activateConfiguration = async () => {
    await api.postConfigurationsValue(configurationId);
    fetchData();
  };

  const addConfiguration = async () => {
    if (!isValid || !jsonText) return;
    await api.postConfiguration({
      applicationId,
      enviromentId: environmentId,
      data: JSON.parse(jsonText),
    });
    setDuplicate(false);
  };

  return {
    isActive,
    activateConfiguration,
    addConfiguration,
    jsonText,
    setJsonText,
    setDuplicate,
    isValid,
    setIsValid,
    duplicate,
  };
};
