import { useEffect, useState } from "react";
import { Space, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

import CustomHeader from "../components/CustomHeader/CustomHeader";
import TrappedSearch from "../components/SideMenu/SideMenu";

import styles from "../styles/home.module.scss";
import ButtonHome from "../components/ButtonHome/ButtonHome";
import Menu from "../components/SideMenu/SideMenu";
import SideMenu from "../components/SideMenu/SideMenu";
import { useDetento } from "../context/DetentosContext";

export default function Home() {
  const [dataSource, setDataSource] = useState();

  const {
    editDetentos,
    getDetentos,
    getUnidades,
    unidades,
    setUnidades,
    detentos,
    setDetentos,
  } = useDetento();

  const onChange = () => {};

  useEffect(() => {
    async function fetchDetentos() {
      try {
        const { data } = await getDetentos();
        setDetentos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetentos()
  }, []);
  return (
    <>
      <div>Olá Mundo</div>
    </>
  );
}
