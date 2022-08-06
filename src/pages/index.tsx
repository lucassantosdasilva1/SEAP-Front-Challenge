import { Button, Space, DatePicker, Card } from 'antd';
import Header from '../components/Header/Header';
import TrappedSearch from '../components/TrappedSearch/TrappedSearch';

export default function Home() {
  const onChange = () => {};
    return (
      <>
        <Header/>
        <div style={{ padding: 100 }}>
          <Space direction="vertical">
            <Button type="primary">Primary Button</Button>
            <Button type="ghost">Ghost Button</Button>
            <DatePicker onChange={onChange} />
            
          </Space>
        </div>
        <TrappedSearch/>
      </>
  )
}
