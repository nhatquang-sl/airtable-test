import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { DrawerHeader, Container } from './styles';

import { RootState } from 'store';
import Models from 'pages/models';
import Drawings from 'pages/drawings';
import Services from 'pages/services';

function Main() {
  const { headerOpen, sideBarOpen } = useSelector((state: RootState) => state.settings);

  return (
    <Container open={sideBarOpen}>
      {headerOpen && <DrawerHeader />}
      <Routes>
        <Route path="/" element={<Models />} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/drawings/:id" element={<Drawings />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Container>
  );
}
export default Main;
