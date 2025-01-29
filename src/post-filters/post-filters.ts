import constate from 'constate';
import { useState } from 'react';

const usePostFiltersInternal = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  return {
    searchQuery,
    setSearchQuery,
    selectedUsers,
    setSelectedUsers,
  };
};

export const [PostFiltersProvider, usePostFilters] = constate(usePostFiltersInternal);
