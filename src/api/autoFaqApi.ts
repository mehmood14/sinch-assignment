import axiosClient from './axiosClient';

const baseURL = 'https://config-mgmt-dev.fly.dev/api/v1';

const api = {
  //Applications

  getApplications: (searchTerm) => {
    return axiosClient.get(`${baseURL}/applications?searchTerm=${searchTerm}`);
  },

  postApplication: (body) => {
    return axiosClient.post(`${baseURL}/applications`, body);
  },

  putApplication: (body, applicationId) => {
    return axiosClient.put(`${baseURL}/applications/${applicationId}`, body);
  },

  deleteApplication: (applicationId) => {
    return axiosClient.delete(`${baseURL}/applications/${applicationId}`);
  },

  //Configurations

  getConfigurations: (body) => {
    return axiosClient.get(
      `${baseURL}/configurations?applicationId=${body.applicationId}&enviromentId=${body.environmentId}`
    );
  },

  postConfiguration: (body) => {
    return axiosClient.post(`${baseURL}/configurations`, body);
  },

  getConfigurationJson: (configurationId) => {
    return axiosClient.get(`${baseURL}/configurations/${configurationId}`);
  },

  postConfigurationsValue: (configurationId) => {
    return axiosClient.post(
      `${baseURL}/configurations/${configurationId}/active`
    );
  },

  //Environments

  getEnvironments: (applicationId) => {
    return axiosClient.get(
      `${baseURL}/applications/${applicationId}/environments`
    );
  },

  postEnvironment: (body, applicationId) => {
    return axiosClient.post(
      `${baseURL}/applications/${applicationId}/environments`,
      body
    );
  },

  putEnvironment: (body, applicationId, environmentId) => {
    return axiosClient.put(
      `${baseURL}/applications/${applicationId}/environments/${environmentId}`,
      body
    );
  },

  deleteEnvironment: (body) => {
    return axiosClient.delete(
      `${baseURL}/applications/${body.applicationId}/environments/${body.id}`,
      body
    );
  },
};

export default api;
