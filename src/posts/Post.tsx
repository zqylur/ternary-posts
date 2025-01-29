import { useParams } from 'react-router-dom';
import { useFetchPost } from '.';
import { Card, Typography } from 'antd';

export const PostDetail = () => {
  const { postId } = useParams();
  const { post } = useFetchPost(postId);

  if (!post) {
    return null;
  }

  return (
    <Card title={post.title}>
      <Typography.Paragraph>{post.body}</Typography.Paragraph>
    </Card>
  );
};
