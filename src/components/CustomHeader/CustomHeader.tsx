import { Image, Layout, Space } from 'antd';
import styles from './customHeader.module.scss';

export default function CustomHeader() {
  return (
      <>
        {/* <div className={styles.container}> */}
        <Space>
          <Image alt='SIISP' src='./logo.png' preview={false}/>
        </Space>
        {/* </div> */}
      </>
    );
  }