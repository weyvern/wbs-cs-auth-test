import { Route, Routes } from 'react-router-dom';
import LayoutMain from './components/LayoutMain';
import HomeFeed from './components/HomeFeed';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<HomeFeed />} />
      </Route>
    </Routes>
  );
};

export default App;
