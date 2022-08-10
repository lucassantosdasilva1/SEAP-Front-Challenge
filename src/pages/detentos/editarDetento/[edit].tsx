import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import {
  Input,
  Button,
  Select,
  Layout,
  PageHeader,
  Col,
  Row,
  Typography,
} from "antd";

import { Content } from "antd/lib/layout/layout";
const { Option } = Select;

import api from "../../../service/api";
import { detentosDTO } from "../../../DTO/DetentosDTO";
import { RestFilled, SaveOutlined } from "@ant-design/icons";
import { EditDetentoDataType, useDetento } from "../../../context/DetentosContext";
import Link from "next/link";
import { randomBytes } from "crypto";

interface Props {
  detento: detentosDTO;
}

// interface Props {
//   detento: {
//     id: number,
//     nome: string;
//     idUnidade: string;
//     unidade: string;
//     nomeMae: string;
//     cpf: string;
//   }
// }

interface ItemProps {
  label: string;
  value: string;
}

export default function EditarDetento({ detento }: Props) {
  const [detentoState, setDetentoState] = useState(detento);
  const [unidadeDescription, setUnidadeDescription] = useState(detento.unidade.descricao);
  const [idDaUnidade, setIdDaUnidade] = useState(detento.unidade.id);

  const { editDetentos, getUnidades, unidades, setUnidades} = useDetento();
  
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

  async function handlePut() {
    const value: detentosDTO = {
      id: detento.id,
      nome: detentoState.nome,
      unidade: {
        id: detentoState.unidade.id != idDaUnidade ?  idDaUnidade : detentoState.unidade.id,
        descricao: unidadeDescription
      },
      cpf: detentoState.cpf,
      nomeMae: detentoState.nomeMae
    }

    try {
      await editDetentos({ ...detento, ...value });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (detento.unidade.descricao != unidadeDescription) {
      const unidade = unidades.filter(unidade => unidade.descricao == unidadeDescription)
      setIdDaUnidade(unidade[0].id)
    }

    getUnidad();
  }, []);

  return (
    <Layout>
      <PageHeader title="Editar Detento" />
      <Content style={{ marginRight: "10rem", marginLeft: "10rem" }}>
        <div style={{ display: "flex", flexDirection: 'column', padding: '20', width: '100%', height: '100%' }}>
          <Row>
            <Col span={24}>
              <Row gutter={[0, 10]} style={{ marginBottom: "0.5rem" }}>
                <label>Nome</label>
                <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.nome} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    nome: e.target.value
                  })} 
                  />
              </Row>
              <Row
                gutter={[0, 10]}
                wrap={true}
                style={{ marginBottom: "0.5rem" }}
              >
                <Col span={24}>
                  <Typography>Unidade</Typography>
                </Col>
                <Select
                  // defaultValue={detento.unidade.descricao}
                  placeholder="Selecione a Unidade"
                  style={{ borderRadius: "5px", width: "100%" }}
                  value={unidadeDescription}
                  onChange={(value) => setUnidadeDescription(value)}
                  options={options}
                >
                </Select>
              </Row>
              <Row gutter={[0, 10]} style={{ marginBottom: "0.5rem" }}>
                <label>Nome Da Mae</label>
                <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.nomeMae} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    nomeMae: e.target.value
                  })} 
                />
              </Row>
              <Row gutter={[0, 10]} style={{ marginBottom: "0.5rem" }}>
                <label>CPF</label>
                <Input 
                  style={{ borderRadius: '5px' }} 
                  value={detentoState.cpf} 
                  onChange={
                    e => setDetentoState(
                  {
                    ...detentoState,
                    cpf: e.target.value
                  })} 
                />
              </Row>
            </Col>
          </Row>
          <div style={{ display: "flex", flexDirection: 'column', alignItems: "flex-end", width: '100%', height: '100%', marginTop: "5%" }}>
            <Link href={`/detentos`}> 
              <a style={{ color: "gray" }}>
                  <Button 
                    type="primary"
                    onClick={() => handlePut()}  
                    icon={<SaveOutlined />}
                  >
                  Salvar
                  </Button>
              </a>
            </Link>
        </div>
      </div>
    </Content>
    </Layout >
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { edit } = params;

  const response = await api.get(`/detentos/${edit}`);
  const detento: detentosDTO = response.data
  // setDetentos(ListaDetentos)

  return {
    props: {
      detento
    }
  }

}