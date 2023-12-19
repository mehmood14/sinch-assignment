import { useState, useEffect } from 'react';
import api from '../../../../api/api';
import { useDebounce } from '../../../../hooks/useDebounce';

export const useApplication = () => {
  const [searchedText, setSearchedText] = useState<string>('');
  const [applicationsList, setApplicationsList] = useState([]);

  const query = useDebounce<string>(searchedText, 500);

  const fetchApplications = async () => {
    const { data } = await api.getApplications(query);
    setApplicationsList(data);
  };

  useEffect(() => {
    fetchApplications();
  }, [query]);

  const handleDeleteClick = async (id) => {
    await api.deleteApplication(id);
    fetchApplications();
  };

  return {
    fetchApplications,
    handleDeleteClick,
    applicationsList,
    setSearchedText,
    searchedText,
  };
};
