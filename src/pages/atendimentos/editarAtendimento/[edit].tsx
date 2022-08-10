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
import {
  EditDetentoDataType,
  useDetento,
} from "../../../context/DetentosContext";
import Link from "next/link";
import { randomBytes } from "crypto";
import { atendimentosDTO } from "../../../DTO/AtendimentosDTO";

interface Props {
  atendimento: atendimentosDTO;
}

interface ItemProps {
  label: string;
  value: string;
}

export default function EditarAtendimento({ atendimento }: Props) {
  const [atendimentoState, setAtendimentoState] = useState(atendimento);
  const [nomeDetento, setNomeDetento] = useState(atendimento.detento.nome);

  const [tipoAtendimentoDrop, setTipoAtendimentoDrop] = useState(atendimento.tipoAtendimento.descricao);

  // const [idDaUnidade, setIdDaUnidade] = useState(detento.unidade.id);

  const { tipoAtendimento,setTipoAtendimento, getTipoAtendimento, detentos, getDetentos, setDetentos, editAtendimentos } = useDetento();

  //popular o dropdown
  const options: ItemProps[] = [];
  for (let i = 0; i < tipoAtendimento.length; i++) {
    const label = tipoAtendimento[i].descricao;
    const value = tipoAtendimento[i].descricao;
    options.push({
      label: label,
      value: value,
    });
  }

  //faz o get e setaunidades ao array "unidades"
  const getAtendiment = async () => {
    const { data } = await getTipoAtendimento();
    setTipoAtendimento(data);
  };

  const getDetent = async () => {
    const {data} = await getDetentos();
    setDetentos(data);
  }
  async function handlePut() {
    const value: atendimentosDTO = {
      id: atendimento.id,
      detento:{
        id: atendimento.id,
        nome: atendimento.detento.nome != nomeDetento? nomeDetento : atendimento.detento.nome,
      },
      tipoAtendimento: {
        id: atendimento.id,
        descricao: atendimento.tipoAtendimento.descricao != tipoAtendimentoDrop ? tipoAtendimentoDrop : atendimento.tipoAtendimento.descricao
      } 
    };

    try {
      await editAtendimentos({ ...atendimento, ...value });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // if (detento.unidade.descricao != unidadeDescription) {
    //   const unidade = unidades.filter(
    //     (unidade) => unidade.descricao == unidadeDescription
    //   );
    //   setIdDaUnidade(unidade[0].id);
    // }

    getAtendiment();
    getDetent();
  }, []);

  return (
    <Layout>
      <PageHeader title="Editar Atendimento" />
      <Content style={{ marginRight: "10rem", marginLeft: "10rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20",
            width: "100%",
            height: "100%",
          }}
        >
          <Row>
            <Col span={24}>
              <Row gutter={[0, 10]} style={{ marginBottom: "0.5rem" }}>
                <Col span={24}>
                  <Typography>Nome do Detento</Typography>
                </Col>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Pesquise o nome"
                  optionFilterProp=""
                  value={nomeDetento}
                  onChange={(value) => setNomeDetento(value)}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).toLocaleLowerCase().includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      .toLowerCase()
                      .localeCompare(
                        (optionB!.children as unknown as string).toLowerCase()
                      )
                  }
                >
                  {
                    detentos.map((item, index) => {
                     return <Option key={index} value={item.nome}>{item.nome}</Option>
                    })
                  }
                </Select>
              </Row>
              <Row
                gutter={[0, 10]}
                wrap={true}
                style={{ marginBottom: "0.5rem" }}
              >
                <Col span={24}>
                  <Typography>Tipo de Atendimento</Typography>
                </Col>
                <Select
                  // defaultValue={detento.unidade.descricao}
                  placeholder="Selecione o Tipo de Atendimento"
                  style={{ borderRadius: "5px", width: "100%" }}
                  value={tipoAtendimentoDrop}
                  onChange={(value) => setTipoAtendimentoDrop(value)}
                  options={options}
                ></Select>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
              height: "100%",
              marginTop: "5%",
            }}
          >
            <Link href={`/atendimentos`}>
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
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { edit } = params;

  const response = await api.get(`/atendimentos/${edit}`);
  const atendimento: atendimentosDTO = response.data

  return {
    props: {
      atendimento,
    },
  };
};
