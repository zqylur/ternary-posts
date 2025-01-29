import constate from 'constate';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useEffectOnce } from 'react-use';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export type Post = { id: number; title: string; userId: number; body: string };

export const useFetchPost = (postId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${BASE_URL}/${postId}`);

      if (!resp.ok) {
        throw new Error('could not fetch');
      }

      const result = await resp.json();

      setPost(result);
    } catch {
      setError('Could not fetch');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    loading,
    error,
    post,
  };
};

const useFetchPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${BASE_URL}`);

      if (!resp.ok) {
        throw new Error('could not fetch');
      }

      const result = await resp.json();

      setPosts(result);
    } catch {
      setError('Could not fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffectOnce(() => {
    fetchPosts();
  });

  return {
    loading,
    error,
    posts,
  };
};

const usePostsInternal = () => {
  const { posts, loading, error } = useFetchPosts();

  const users = useMemo(() => {
    return Array.from(new Set(posts.map((p) => p.userId)).values());
  }, [posts]);

  return {
    posts,
    users,
    loading,
    error,
  };
};

const [PostsProvider, usePostsStore] = constate(usePostsInternal);

export { PostsProvider };

export const useAllPosts = () => {
  const { posts, loading, error } = usePostsStore();

  const postsByUser = useMemo(() => {
    const counts = new Map<number, number>();
    posts.forEach((post) => {
      counts.set(post.userId, (counts.get(post.userId) || 0) + 1);
    });
    return counts;
  }, [posts]);

  return { posts, postsByUser, loading, error };
};

export const useUsers = () => {
  const { users } = usePostsStore();

  return users;
};
