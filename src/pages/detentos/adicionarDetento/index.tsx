import React, { useContext, useEffect, useState } from 'react';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
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
import Link from 'next/link';
import { detentosDTO } from '../../../DTO/DetentosDTO';
import { EditDetentoDataType, useDetento } from '../../../context/DetentosContext';

const { Option } = Select;

interface ItemProps {
  label: string;
  value: string;
}


export default function AdicionarDetento() {
  const detentoVazio : EditDetentoDataType = {
    id: 0,
    nome: "",
    unidade: "",
    cpf: "",
    nomeMae: ""
  }
  const [detentoState, setDetentoState] = useState<EditDetentoDataType>(detentoVazio)
  const [unidadeDescription, setUnidadeDescription] = useState();

  const { editDetentos, getUnidades, unidades, setUnidades, detentos, postDetentos} = useDetento();

  //popular o dropdown
  const options: ItemProps[] = []
  for (let i = 0; i < unidades.length; i++) {
    const label = unidades[i].descricao
    const value = unidades[i].descricao
    options.push({
      label: label,
      value: value
    });
  }
  //faz o get e setaunidades ao array "unidades"
  const getUnidad = async () => {
    const {data} = await getUnidades(); 
    setUnidades(data);
  }


  const handlePost = async () => {   
    const value: detentosDTO = {
      id: detentos.length + 1,
      nome: detentoState.nome,
      unidade: {
        id: Math.floor(Math.random() * 7),
        descricao: unidadeDescription
      },
      cpf: detentoState.cpf,
      nomeMae: detentoState.nomeMae
    }

    try {
      await postDetentos(value)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUnidad();
  }, []);

  return (
    <Layout> 
      <PageHeader title="Adicionar Detento"/>
      <Content style={{marginRight: '10rem',marginLeft: '10rem'}}>
          <Row>
          <Col span={24}>
            <Row gutter={[0, 10]} style={{marginBottom: '0.5rem'}}>
                <label>Nome</label>
                <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.nome} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    nome: e.target.value
                  })} />
            </Row>
            <Row gutter={[0, 10]} wrap={true} style={{marginBottom: '0.5rem'}}> 
                <Col span={24}>
                  <Typography>Unidade</Typography>
                </Col>
                <Select 
                placeholder='Selecione a Unidade' 
                style={{borderRadius: '5px', width: '100%'}} 
                onChange={(value) => setUnidadeDescription(value)}
                options={options}>
                </Select>
            </Row>
            <Row gutter={[0, 10]} style={{marginBottom: '0.5rem'}}>
                <label>Nome Da Mae</label>
                <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.nomeMae} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    nomeMae: e.target.value
                  })} />
            </Row>
            <Row gutter={[0, 10]} style={{marginBottom: '0.5rem'}}>
              <label>CPF</label>
              <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.cpf} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    cpf: e.target.value
                  })} />
            </Row>
          </Col>
          <div style={{ display: "flex", flexDirection: 'column', alignItems: "flex-end", width: '100%', height: '100%', marginTop: "5%" }}>
            <Link href={`/detentos`}> 
              <a style={{ color: "gray" }}>
                  <Button 
                    type="primary"
                    onClick={() => handlePost()}  
                    icon={<SaveOutlined />}
                  >
                  Salvar
                  </Button>
              </a>
            </Link>
          </div>
          </Row>
      </Content>
    </Layout>
  )
}