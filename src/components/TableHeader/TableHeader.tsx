import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row } from "antd";
import Link from "next/link";

import styles from './tableHeader.module.scss';

interface TableHeaderProps {
  title: string;
  href: string;
  buttonTitle: string;
}

export default function TableHeader({title, href, buttonTitle} : TableHeaderProps) {
  return (
    <PageHeader
    title={title}
    extra={[
      <>
        <Link href={href}>
          <a className={styles.CriarAtendButton}>
            <PlusOutlined style={{marginRight: 5}}/> {buttonTitle}
          </a>
        </Link>
      </>
    ]}
  />
  )
}