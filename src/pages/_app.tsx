import "../styles/global.scss";
import "antd/dist/antd.css";
import { AppProps } from "next/app";
import MainContainer from "../components/Maincontainer/MainContainer";

import DetentoProvider from "../context/DetentosContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DetentoProvider>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </DetentoProvider>
  );
}

export default MyApp;
