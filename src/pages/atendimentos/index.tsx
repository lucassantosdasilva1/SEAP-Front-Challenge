import {
  ContainerFilled,
  DeleteColumnOutlined,
  DeleteFilled,
  EditFilled,
  EditOutlined,
  PlusCircleFilled,
  PlusOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Anchor, Button, Layout, PageHeader, Space } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Table, { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActionTable from "../../components/ActionsTable/ActionsTable";
import TableHeader from "../../components/TableHeader/TableHeader";
import { EditAtendimentoDataType } from "../../context/DetentosContext";
import { atendimentosDTO } from "../../DTO/AtendimentosDTO";
import api from "../../service/api";

import styles from "./atendimentos.module.scss";

interface DataType {
  id: number;
  detento: string;
  tipoAtendimento: string;
}

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);


  const dataSource = [
    {
      id: "1",
      tipoAtendimento: "Educação",
      atendimento: "Filipe Gomes",
    },
    {
      id: "2",
      tipoAtendimento: "Educação",
      atendimento: "Filipe Gomes",
    },
    {
      id: "3",
      tipoAtendimento: "Educação",
      atendimento: "Filipe Gomes",
    },
  ];

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
      render: (_: any, record: EditAtendimentoDataType) => <ActionTable hrefEdit="/atendimentos/editarAtendimento" id={record.id}/>
    },
  ];

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const response = await api.get("/atendimentos");
        const data : atendimentosDTO[] = response.data
        const ListaAtendimentos : DataType[] = data.map(atendimento => ({
          id: atendimento.id,
          detento: atendimento.detento.nome,
          tipoAtendimento: atendimento.tipoAtendimento.descricao
          })
        )
        setAtendimentos(ListaAtendimentos)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
   }

    fetchAtendimentos();
  }, []);

  return (
    <>
      <Layout>
        <Content>
          <Table
            dataSource={atendimentos}
            columns={columns}
            title={() => <TableHeader title="Atendimentos" buttonTitle="Novo Atendimento" href="/atendimentos/novoAtendimento" />}
            size="small"
          />
        </Content>
      </Layout>
    </>
  );
}