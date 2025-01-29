import { Outlet, Route, Routes, useLocation } from 'react-router';
import { Layout, Typography } from 'antd';
import { PostFiltersProvider } from './post-filters';
import { PostDetail, Posts, PostsProvider } from './posts';

import './App.css';

const HEADER_STYLE = {
  color: '#fff',
  height: 64,
  paddingInline: 16,
  lineHeight: '64px',
  backgroundColor: '#93A8AC',
};

function App() {
  return (
    <PostsProvider>
      <PostFiltersProvider>
        <Routes>
          <Route element={<MainContent />}>
            <Route index element={<Posts />} />
            <Route path='/posts/:postId' element={<PostDetail />} />
          </Route>
        </Routes>
      </PostFiltersProvider>
    </PostsProvider>
  );
}

const MainContent = () => {
  const location = useLocation();

  return (
    <Layout>
      <Layout.Header style={HEADER_STYLE}>
        {location.pathname !== '/' && (
          <Typography.Link href='/' style={{ color: 'white' }}>
            See all posts
          </Typography.Link>
        )}
      </Layout.Header>
      <Layout.Content style={{ padding: '32px 16px' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default App;
