import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useAllPosts, useUsers } from '../posts';
import { usePostFilters } from './post-filters';
import { useMemo } from 'react';

export const PostFilterControls = () => {
  const { searchQuery, selectedUsers, setSearchQuery, setSelectedUsers } = usePostFilters();
  const { posts } = useAllPosts();
  const users = useUsers();

  // Filter posts by search text first to get an accurate counting of the number of posts per user
  const filteredPosts = useMemo(
    () => posts.filter((p) => !searchQuery || p.title.toLocaleLowerCase().includes(searchQuery)),
    [posts, searchQuery],
  );

  const postsByUser = useMemo(() => {
    const counts = new Map<number, number>();
    filteredPosts.forEach((post) => {
      counts.set(post.userId, (counts.get(post.userId) || 0) + 1);
    });
    return counts;
  }, [filteredPosts]);

  const userOptions = useMemo(
    () =>
      users.map((u) => ({
        value: u,
        label: `User: ${u} (${postsByUser.get(u) ?? 0} posts)`,
      })),
    [postsByUser, users],
  );

  return (
    <Space.Compact block>
      <Select
        style={{ width: '50%' }}
        size='large'
        mode='multiple'
        value={selectedUsers}
        placeholder='Select users'
        onChange={setSelectedUsers}
        options={userOptions}
      />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size='large'
        style={{ width: '50%' }}
        placeholder='Search posts'
        prefix={<SearchOutlined />}
      />
    </Space.Compact>
  );
};
