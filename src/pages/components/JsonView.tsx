import { useEffect, useMemo, useState } from 'react';
import api from '../../api/autoFaqApi';
import { Button, Textarea } from '@nextui-org/react';

export const JsonView = ({
  configurationId,
  configurationsList,
  applicationId,
  environmentId,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const [isValid, setIsValid] = useState(true);

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

  const setJsonValue = async (e) => {
    setJsonText(e.target.value);
    try {
      JSON.parse(e.target.value);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      console.error('Invalid JSON:', error.message);
    }
  };

  const isActive = useMemo(() => {
    if (duplicate) return true;
    if (!jsonText || !jsonText.includes('active')) return false;

    const { active } = JSON.parse(jsonText);

    return active;
  }, [jsonText, duplicate]);

  return (
    <div className="w-full gap-4 bg-gray-100 p-4 rounded-lg flex flex-col justify-between overflow-auto">
      <Textarea
        value={jsonText}
        onChange={setJsonValue}
        placeholder="Enter configuration here..."
        isInvalid={!isValid}
        errorMessage={isValid ? '' : 'Please enter a valid json'}
        disabled={!configurationsList ? duplicate : !duplicate}
      ></Textarea>

      <div className="flex justify-end gap-2">
        {configurationsList > 0 && (
          <Button onClick={activateConfiguration} isDisabled={isActive}>
            {isActive ? 'Already active' : 'Activate'}
          </Button>
        )}

        {duplicate || !configurationsList ? (
          <Button onClick={addConfiguration}>Add Config</Button>
        ) : (
          <Button onClick={() => setDuplicate(true)}>Edit & Duplicate</Button>
        )}
      </div>
    </div>
  );
};
