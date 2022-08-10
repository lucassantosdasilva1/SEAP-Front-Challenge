import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Layout,
  PageHeader,
  Col,
  Row,
  Typography,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';

const { Option } = Select;

export default function NovoAtendimento() {
  const [unidade, setUnidade] = useState("educacao")

  return (
    <Layout>
      <PageHeader title="Novo atendimento" />
      <Content style={{ marginRight: '10rem', marginLeft: '10rem' }}>
        <Row>
          <Col span={24}>
            <Row gutter={[0, 10]} wrap={true} style={{ marginBottom: '0.5rem' }}>
              <Col span={24}>
                <label>Detento:</label>
              </Col>
              <Select
                 showSearch
                 placeholder="Digite o nome do Detento para pesquisar"
                 optionFilterProp="children"
                 style={{width: "100%"}}
                //  onChange={onChange}
                //  onSearch={onSearch}
                 filterOption={(input, option) =>
                   (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                 }
               >
                 <Option value="jack">Jack</Option>
                 <Option value="lucy">Lucy</Option>
                 <Option value="tom">Tom</Option>
              </Select>
            </Row>
            <Row gutter={[0, 10]} wrap={true} style={{ marginBottom: '0.5rem' }}>
              <Col span={24}>
                <Typography>Tipo de Atendimento</Typography>
              </Col>
              <Select placeholder='Selecione a Unidade' style={{ borderRadius: '5px', width: '100%' }} defaultValue={unidade}>
                <Option value="educacao">Educação</Option>
                <Option value="enfermagem">Enfermagem</Option>
                <Option value="psicologia">Psicologia</Option>
                <Option value="seguranca">Segurança</Option>
                <Option value="social">Social</Option>
              </Select>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

