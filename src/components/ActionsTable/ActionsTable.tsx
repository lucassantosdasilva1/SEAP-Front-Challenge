import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Link from "next/link";
import { useDetento } from "../../context/DetentosContext";

interface ActionTable {
  id?: number;
  hrefEdit: string;
  hrefDelete?: string;
  whoDelete: string;
}

export default function ActionTable({ hrefEdit, hrefDelete, id, whoDelete}: ActionTable) {
  const {deleteDetentos, deleteAtendimentos} = useDetento();

  const handleDelete = async () => {
    try {
      if (whoDelete == "detentos") {
        await deleteDetentos(id);
      } else {
        await deleteAtendimentos(id); 
      }
    } catch (error) {
     console.log(error); 
    } finally {
      // window.location.reload();
    }
  }

  return (
    <>
      { hrefEdit == "/detentos/editarDetento" ? 
        <Link href={`${hrefEdit}/${id}`}> 
          <a style={{ color: "gray" }}>
            <EditFilled style={{ marginRight: 20, cursor: "pointer" }} />
          </a>
        </Link>
        : 
        <Link href={`${hrefEdit}/${id}`}>
          <a style={{ color: "gray" }}>
            <EditFilled style={{ marginRight: 20, cursor: "pointer" }} />
          </a>
        </Link>
      }
      <Popconfirm title="Apagar este registro?" onConfirm={handleDelete}>
          <DeleteFilled style={{ cursor: "pointer" }} />
      </Popconfirm>
    </>
  );
}
