import styles from './trappedsearch.module.scss';
import {
  BasicLayout,
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';

import { SmileOutlined } from '@ant-design/icons';

import { Card } from 'antd';

export default function TrappedSearch() {
  return (
    <BasicLayout
      fixSiderbar
      fixedHeader
      navTheme="light"
      breakpoint={false}
      defaultCollapsed
      pageTitleRender={false}
      menuDataRender={() => [
        {
          path: '/one',
          icon: <SmileOutlined />,
          name: 'a',
          routes: [
            {
              path: 'two',
              name: 'b',
            },
          ],
        },
      ]}
      layout="mix"
      location={{
        pathname: '/one/two',
      }}
    >
      <PageContainer title="c">
        <Card>
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            onFinish={async (values) => console.log(values)}
          >
            <ProForm.Group>
              <ProFormText
                name="name"
                label="d"
                tooltip="e"
                placeholder="f"
              />
              <ProFormText
                width="md"
                name="company"
                label="g"
                placeholder="h"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText name={['contract', 'name']} label="i" placeholder="j" />
              <ProFormDateRangePicker name={['contract', 'createTime']} label="k" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: 'l',
                  },
                ]}
                width="xs"
                name="chapter"
                label="m"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: 'n',
                  },
                ]}
                name="unusedMode"
                label="o"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="p" />
            <ProFormText name="project" disabled label="q" initialValue="r" />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="s"
              initialValue="t"
            />
            <ProForm.Group>
              <ProFormSelect
                initialValue="money"
                options={[
                  {
                    value: 'money',
                    label: 'u',
                  },
                ]}
                width="xs"
                name="useMode"
                label="v"
              />
              <ProFormSelect
                options={[
                  {
                    value: '6',
                    label: '6%',
                  },
                  {
                    value: '12',
                    label: '12%',
                  },
                ]}
                initialValue="6"
                width="xs"
                name="taxRate"
                label="w"
              />
              <ProFormRadio.Group
                label="x"
                name="invoiceType"
                initialValue="y"
                options={['z', 'a1', 'b1']}
              />
            </ProForm.Group>
            <ProFormUploadButton
              extra="c1：.jpg .zip .doc .wps"
              label="d1"
              name="file"
              title="e1"
            />
            <ProFormDigit width="xs" name="num" label="f1" initialValue={5} />
            <ProFormTextArea width="xl" label="g1" name="remark" />
          </ProForm>
        </Card>
      </PageContainer>
    </BasicLayout>
  );
};