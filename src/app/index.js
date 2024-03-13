import React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Description from './description';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          {['/','/page/:_id'].map(path => <Route path={path} element={<Main/>}/>)}
          <Route path='/description/:_id' element={<Description />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </Router>
    </>
  );
}

export default App;
