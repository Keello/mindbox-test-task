import axios from 'axios';
import { useEffect, useState } from 'react';

const useDataFetcher = <ResponseType>(url: string) => {
  const [data, setData] = useState<ResponseType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError('Unexpected error...');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useDataFetcher;
