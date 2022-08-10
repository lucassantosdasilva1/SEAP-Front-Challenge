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

export default function NovoAtendimento({ atendimento }: Props) {
  const [tipoAtendimentoDrop, setTipoAtendimentoDrop] = useState("");
  const [nomeDetento, setNomeDetento] = useState("");


  // const [idDaUnidade, setIdDaUnidade] = useState(detento.unidade.id);

  const { postAtendimentos, tipoAtendimento, setTipoAtendimento, getTipoAtendimento, detentos, getDetentos, setDetentos, editAtendimentos, atendimentos } = useDetento();

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
  async function handlePost() {
    const value: atendimentosDTO = {
      id: atendimentos.length + 1,
      detento:{
        id: atendimentos.length + 1,
        nome: nomeDetento,
      },
      tipoAtendimento: {
        id: atendimentos.length + 1,
        descricao: tipoAtendimentoDrop
      } 
    };
    console.log()

    try {
      await postAtendimentos(value);
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
  }, []);

  return (
    <Layout>
      <PageHeader title="Novo Atendimento" />
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
                  onClick={() => handlePost()}
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
