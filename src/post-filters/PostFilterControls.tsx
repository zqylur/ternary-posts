import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useAllPosts, useUsers } from '../posts';
import { usePostFilters } from './post-filters';
import { useMemo } from 'react';

export const PostFilterControls = () => {
  const { searchQuery, selectedUsers, setSearchQuery, setSelectedUsers } = usePostFilters();
  const { postsByUser } = useAllPosts();
  const users = useUsers();

  const userOptions = useMemo(
    () =>
      users.map((u) => ({
        value: u,
        label: `User: ${u} (${postsByUser.get(u)} posts)`,
      })),
    [postsByUser, users],
  );

  return (
    <Space direction='horizontal' size={8} style={{ width: '100%' }}>
      <Select
        size='large'
        mode='multiple'
        value={selectedUsers}
        placeholder='Select users'
        onChange={setSelectedUsers}
        style={{ width: '100%', minWidth: 400 }}
        options={userOptions}
      />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size='large'
        style={{ minWidth: 400 }}
        placeholder='Search posts'
        prefix={<SearchOutlined />}
      />
    </Space>
  );
};
