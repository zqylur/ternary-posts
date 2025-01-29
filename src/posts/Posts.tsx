import { useMemo } from 'react';
import { Post, useAllPosts } from '.';
import { PostFilterControls, usePostFilters } from '../post-filters';
import { List, Space, Typography } from 'antd';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={posts}
      header={
        <Typography.Title level={3}>
          {posts.length} total post{posts.length > 1 ? 's' : ''}
        </Typography.Title>
      }
      renderItem={(p) => (
        <List.Item>
          <List.Item.Meta
            title={
              <a href={`posts/${p.id}`}>
                <Space direction='vertical' size={2}>
                  {p.title}
                  <Typography.Text italic>User: {p.userId}</Typography.Text>
                </Space>
              </a>
            }
          />
          {p.body}
        </List.Item>
      )}
    />
  );
};

export const Posts = () => {
  const { posts, loading } = useAllPosts();
  const { searchQuery, selectedUsers } = usePostFilters();

  const filteredPosts = useMemo(
    () =>
      posts.filter((p) => {
        return (
          (!searchQuery || p.title.toLocaleLowerCase().includes(searchQuery)) &&
          (!selectedUsers || selectedUsers.length === 0 || selectedUsers.includes(p.userId))
        );
      }),
    [posts, searchQuery, selectedUsers],
  );

  return (
    <>
      <PostFilterControls />
      {loading && 'Loading...'}
      <PostList posts={filteredPosts} />
    </>
  );
};
