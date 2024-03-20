import React from 'react';
import styles from './App.module.css';
import classNames from 'classnames/bind';
import Header from 'components/header/Header/Header'
// import TabController from 'components/header/TabController/TabController'
import ContentController from 'components/body/common/ContentController/ContentController'
import AuthController from 'components/auth/AuthController/AuthController'
import LoadingSpinner from './body/common/LoadingSpinner/LoadingSpinner';
import Footer from './footer/Footer/Footer';
import PrintContainer from './body/common/PrintContainer/PrintContainer';
import { useSelector } from 'react-redux';
import SideNavigator from './header/SideNavigator/SideNavigator';
import AdminHeader from './header/AdminHeader/AdminHeader';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Log from 'components/log/Log';

import { datadogRum } from '@datadog/browser-rum';

// 레이아웃 2개로 관리

datadogRum.init({
    applicationId: '9b98bf7f-896c-496e-a2ed-7c472863f206',
    clientToken: 'pubb75e42afd629861431f8868c93ac2c9e',
    site: 'datadoghq.com',
    service:'twr',
    trackUserInteractions: true,
    env:'prod'    
});
    
datadogRum.startSessionReplayRecording();


const cx = classNames.bind(styles);



// 여기서부터만 참고

const App = () => {
  const isPrintOn = useSelector(state=>state.header.isPrintOn)
  const isAdmin = useSelector(state=>state.auth.isAdmin)

  return (
    <BrowserRouter>
      <Routes>
        {/* spmviewer에서 넘어오는것 처리용*/}
          <Route element={<MainLayout isAdmin={isAdmin} isPrintOn={isPrintOn} />}>
            <Route path='/:org_cd' element={<ContentController/>}/>
            <Route path='*' element={<ContentController/>}/>
          </Route>
          <Route path="/log" element={<Log />} />
      </Routes>
    </BrowserRouter>
  );
}

const MainLayout = (props: any) => {
  const { isAdmin, isPrintOn } = props;
  return (
    <div id={'App'} className={cx('App', isAdmin ? 'admin-mode' : '')}>
      <LoadingSpinner/>
      <SideNavigator/>
      {isAdmin ? <AdminHeader/> : null }
      <div className={cx('App-contents')}>
          <Header/>
            {/* <TabController/> */}
            <AuthController >
              <Outlet />
            </AuthController>
          <Footer/>
        </div>
        {isPrintOn ? <PrintContainer/> : null}
    </div>
  )
}


export default App;
