import { useState, useEffect } from 'react';
import api from '../api/api';

export const useApi = () => {
  const [environmentsList, setEnvironmentsList] = useState([]);
  const [configurationsList, setConfigurationsList] = useState([]);

  const [applicationId, setApplicationId] = useState<string>('');
  const [environmentId, setEnvironmentId] = useState<string>('');
  const [configurationId, setConfigurationId] = useState<string>('');

  const fetchData = async (getDataFunction, setDataFunction, ...params) => {
    const data = await getDataFunction(...params);
    setDataFunction(data.data);
  };

  useEffect(() => {
    if (!applicationId) return;
    fetchData(api.getEnvironments, setEnvironmentsList, applicationId);
  }, [applicationId]);

  useEffect(() => {
    if (!environmentId || !applicationId) return;
    fetchData(api.getConfigurations, setConfigurationsList, {
      applicationId,
      environmentId,
    });
  }, [environmentId, applicationId]);

  useEffect(() => {
    setEnvironmentsList([]);
    setConfigurationsList([]);
  }, [applicationId]);

  return {
    environmentsList,
    configurationsList,
    applicationId,
    setApplicationId,
    setEnvironmentId,
    environmentId,
    setConfigurationId,
    configurationId,
  };
};
