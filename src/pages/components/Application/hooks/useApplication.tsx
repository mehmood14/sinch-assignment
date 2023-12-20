import { useState, useEffect } from 'react';
import api from '../../../../api/api';
import { useDebounce } from '../../../../hooks/useDebounce';

export const useApplication = () => {
  const [searchedText, setSearchedText] = useState<string>('');
  const [applicationsList, setApplicationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useDebounce<string>(searchedText, 500);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await api.getApplications(query);
      setApplicationsList(data.data);
    } catch (error) {
      console.log('error', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, [query]);

  const handleDeleteClick = async (id) => {
    try {
      await api.deleteApplication(id);
    } catch (error) {
      console.log('error', error);
    }
    fetchApplications();
  };

  return {
    fetchApplications,
    handleDeleteClick,
    applicationsList,
    setSearchedText,
    searchedText,
    isLoading,
  };
};
