import { useEffect, useState } from "react";

import { CloseCircleFilled, DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Layout, PageHeader, Table } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

import ActionTable from "../../components/ActionsTable/ActionsTable";
import TableHeader from "../../components/TableHeader/TableHeader";

import { detentosDTO } from "../../DTO/DetentosDTO";
import api from "../../service/api";

import { useDetento } from "../../context/DetentosContext";

import { EditDetentoDataType } from "../../context/DetentosContext";

import { Input } from "antd";
const { Search } = Input;

export default function Detentos() {
  const [loading, setLoading] = useState<boolean>();

  const { getDetentos, detentos, setDetentos, datasource } = useDetento();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Unidade",
      dataIndex: "unidade",
      key: "unidade",
    },
    {
      title: "Nome da Mae",
      dataIndex: "nomeMae",
      key: "nomeMae",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Ação",
      dataIndex: "acao",
      key: "acao",
      render: (_: any, record: EditDetentoDataType) => (
        <ActionTable hrefEdit="/detentos/editarDetento" id={record.id} whoDelete="detentos"/>
      ),
    },
  ];

  async function fetchDetentos() {
    setLoading(true);
    try {
      const { data } = await getDetentos();
      setDetentos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //=========pesquisa============
  const [textoPesquisa, setTextoPesquisa] = useState("");

  const filteredData = datasource.filter((item) => item.nome.toLocaleLowerCase().includes(textoPesquisa));
  //=========pesquisa============

  useEffect(() => {
    fetchDetentos();
  }, []);

  return (
    <>
      <Layout>
        <Content>
          <Table
            dataSource={filteredData}
            columns={columns}
            title={() => (
              <>
                <TableHeader
                  title="Detentos"
                  buttonTitle="Adicionar Detento"
                  href="/detentos/adicionarDetento"
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
