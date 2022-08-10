import { useEffect, useState } from 'react';
import { Space, Layout } from 'antd';
import CustomHeader from '../CustomHeader/CustomHeader';
import SideMenu from '../SideMenu/SideMenu';
const { Header, Footer, Sider, Content } = Layout;

import styles from './mainContainer.module.scss';

export default function MainContainer({ children }) {
  return (
    <>
      <Layout className={styles.container}>
        <Header style={{width: '100vw'}}>
          <CustomHeader />
        </Header>
        <Layout>
          <Sider width="17vw">
            <SideMenu />
          </Sider>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
