import { createContext, useContext, useState, type ReactNode, } from 'react';
import { type ComplaintListDto } from '../types/reclamacoesTypes';
import type { Page } from '../types/pagesType';
import api from '../services/axios.ts';

interface ComplaintsContextType {
  list: ComplaintListDto[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
  pageSize: number;
  fetchComplaints: (options?: { page?: number }) => Promise<void>;
  fetchDeletedComplaints: (options?: { page?: number }) => Promise<void>;
  setPage: (page: number) => void;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

export const ComplaintsProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<ComplaintListDto[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [page, setPageState] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(9);

  const fetchComplaints = async (options?: { page?: number }) => {
    setStatus('loading');
    setError(null);
  
    const currentPage = options?.page ?? page;
  
    try {
      const response = await api.get<Page<ComplaintListDto>>('/complaints', {
        params: { page: currentPage, size: pageSize }
      });

      setList(Array.isArray(response.data.content) ? response.data.content : []);
      setTotalPages(response.data.totalPages);
      setPageState(currentPage); 
      setStatus('succeeded');
      setError(null);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Erro ao buscar reclamações.';
      setStatus('failed');
      setError(msg);
    }
  };
  
  const fetchDeletedComplaints = async (options?: { page?: number }) => {
    setStatus('loading');
    setError(null);
    const currentPage = options?.page ?? page;
  
    try {
      const response = await api.get<Page<ComplaintListDto>>('/complaints/deleted', {
        params: { page: currentPage, size: pageSize }
      });

      setList(Array.isArray(response.data.content) ? response.data.content : []);
      setTotalPages(response.data.totalPages);
      setPageState(currentPage);
      setStatus('succeeded');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Erro ao buscar reclamações.';
      setStatus('failed');
      setError(msg);
    }
  };

  const setPage = (page: number) => {
    setPageState(page);
    fetchComplaints({ page });
  };

  return (
    <ComplaintsContext.Provider
      value={{
        list,
        status,
        error,
        page,
        totalPages,
        pageSize,
        fetchComplaints,
        fetchDeletedComplaints,
        setPage,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = (): ComplaintsContextType => {
  const context = useContext(ComplaintsContext);
  if (!context) throw new Error('useComplaints must be used within ComplaintsProvider');
  return context;
};
