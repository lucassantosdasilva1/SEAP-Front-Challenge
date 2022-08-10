import { TeamOutlined, MailOutlined, LaptopOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import Link from "next/link";
import { useState } from "react";

export default function SideMenu() {
  const [current, setCurrent] = useState("1");

  const items: ItemType[] = [
    {
      label: (
        <Link href="/detentos">
          <a>Detentos</a>
        </Link>
      ),
      key: "detentos",
      icon: <TeamOutlined />,
    },
    {
      label: (
        <Link href="/atendimentos">
          <a>Atendimentos</a>
        </Link>
      ),
      key: "atendimentos",
      icon: <LaptopOutlined />,
    }
     //,
    // {
    //   label: "Navigation Three - Submenu",
    //   key: "SubMenu",
    //   icon: <MailOutlined />,
    //   children: [
    //     {
    //       type: "group",
    //       label: "Item 1",
    //       children: [
    //         {
    //           label: "Option 1",
    //           key: "setting:1",
    //         },
    //         {
    //           label: "Option 2",
    //           key: "setting:2",
    //         },
    //       ],
    //     },
    //     {
    //       type: "group",
    //       label: "Item 2",
    //       children: [
    //         {
    //           label: "Option 3",
    //           key: "setting:3",
    //         },
    //         {
    //           label: "Option 4",
    //           key: "setting:4",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: (
    //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
    //       Navigation Four - Link
    //     </a>
    //   ),
    //   key: "alipay",
    // },
  ];

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />; */}
      <Menu
        items={items}
        onClick={onClick}
        theme="dark"
        openKeys={["detentos"]}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={false }
        // style={{padding: 0}}
      />
      ;
    </>
  );
}
