import { useEffect, useState } from "react";

import { Anchor, Button, Layout, PageHeader, Space } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Table, { ColumnsType } from "antd/lib/table";

import Link from "next/link";

import ActionTable from "../../components/ActionsTable/ActionsTable";
import TableHeader from "../../components/TableHeader/TableHeader";

import { EditAtendimentoDataType, useDetento } from "../../context/DetentosContext";

import { atendimentosDTO } from "../../DTO/AtendimentosDTO";
import api from "../../service/api";

import { Input } from "antd";
const { Search } = Input;

import styles from "./atendimentos.module.scss";
import ActionTableAtendimento from "../../components/ActionsTable/ActionTableAtendimentos";

interface DataType {
  id: number;
  detento: string;
  tipoAtendimento: string;
}

export default function Atendimentos() {
  const [loading, setLoading] = useState(true);

  const { getAtendimentos, atendimentos, setAtendimentos, datasourceAtend } = useDetento();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Detento",
      dataIndex: "detento",
      key: "detento",
    },
    {
      title: "Tipo de Atendimento",
      dataIndex: "tipoAtendimento",
      key: "tipoAtendimento",
    },
    {
      title: "Ação",
      dataIndex: "acao",
      key: "acao",
      render: (_: any, record: EditAtendimentoDataType) => <ActionTableAtendimento hrefEdit="/atendimentos/editarAtendimento" id={record.id}/>
    },
  ];

  async function fetchAtendimentos() {
    setLoading(true);
    try {
      const { data } = await getAtendimentos();
      setAtendimentos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


    //=========pesquisa============
    const [textoPesquisa, setTextoPesquisa] = useState("");

    const filteredData = datasourceAtend.filter((item) => item.detento.toLocaleLowerCase().includes(textoPesquisa));
    //=========pesquisa============
  
  useEffect(() => {
    fetchAtendimentos()
  }, []);

  return (
    <>
      <Layout>
        <Content>
          <Table
            dataSource={datasourceAtend}
            columns={columns}
            title={() => (
              <>
                <TableHeader 
                  title="Atendimentos" 
                  buttonTitle="Novo Atendimento" 
                  href="/atendimentos/novoAtendimento" 
                />
                <Search
                  size="large"
                  // ref={(ele) => (textoPesquisa = ele)}
                  // suffix={sufixo}
                  onChange={(e) => setTextoPesquisa(e.target.value)}
                  placeholder="Digite o nome do detento"
                  value={textoPesquisa}
                />
              </>
              )}
              size="small"
          />
        </Content>
      </Layout>
    </>
  );
}