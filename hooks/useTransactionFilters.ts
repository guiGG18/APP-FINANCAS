import { TransactionFilter } from '@/types/transactionFilters';
import { useEffect, useState } from 'react';


export const useTransactionFilters = () => {
  const [filters, setFilters] = useState<TransactionFilter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setIsLoading(true);

        const mockFromDb = ['todas', 'pagas', 'pendentes', 'geradas'];

        const formattedFilters = mockFromDb.map(status => ({
          id: status,
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status
        }));

        setFilters(formattedFilters);
      } finally {
        setIsLoading(false);
      }

    };

    loadFilters();
  }, []);

  return { filters, isLoading };
};
