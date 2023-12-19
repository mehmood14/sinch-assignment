import { Button } from '@nextui-org/react';
import { useState } from 'react';
import api from '../../api/autoFaqApi';

export const AddNewJson = () => {
  const [jsonText, setJsonText] = useState('');

  const addConfiguration = async () => {
    try {
      const jsonData = JSON.parse(jsonText);
      await api.postConfiguration({
        applicationId,
        environmentId: environmentId,
        data: jsonData,
      });
    } catch (error) {
      console.error('Invalid JSON:', error.message);
    }
  };

  return (
    <div>
      <textarea
        className="w-full max-h-64 bg-gray-100 p-4 rounded-lg overflow-auto text-gray-500 text-sm"
        value={jsonText}
        onChange={(e) => {
          setJsonText(e.target.value);
        }}
        placeholder="Enter JSON here..."
      ></textarea>

      <Button onClick={addConfiguration}>Add Config</Button>
    </div>
  );
};
