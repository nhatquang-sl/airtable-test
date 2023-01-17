import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { DrawerHeader, Container } from './styles';

import { RootState } from 'store';
import Models from 'pages/models';

function Main() {
  const { headerOpen, sideBarOpen } = useSelector((state: RootState) => state.settings);

  return (
    <Container open={sideBarOpen}>
      {headerOpen && <DrawerHeader />}
      <Routes>
        <Route path="/" element={<Models />} />
      </Routes>
    </Container>
  );
}
export default Main;
