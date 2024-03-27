import AddForm from '@/components/Modal/Add';
import { listToTree } from '@/utils';
import { createRole, getRoleList } from '@/utils/request/Role';
import { getPermissionList } from '@/utils/request/permission';
import { ActionType, PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space, Tag, Tree, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './index.less';
const defaultData = [
  {
    id: 1,
    name: 'admin',
    createTime: '2024-03-21T18:06:50.681Z',
    updateTime: '2024-03-21T18:06:50.681Z',
    desc: '我是一条测试的描述',
    permissions: [],
  },
];
type DataItem = {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  desc: string;
  permissions: any[];
};
type DataItemList = Partial<DataItem>;
const Role = () => {
  const [dataSource, setDataSource] = useState<DataItemList[]>(defaultData);
  const [treeData, setTreeData] = useState<DataItemList[]>(defaultData);
  const [selectRole, setSelectRole] = useState<DataItemList>();
  const [editVisible, setEditVisible] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const getRolesList = async () => {
    const res = await getRoleList();
    setDataSource(res.data);
    return res;
  };
  const getPermissionsList = async () => {
    const res = await getPermissionList();
    const treeDatas = listToTree(res.data, 0);
    setTreeData(treeDatas);
    console.log(treeDatas);
  };
  const actionRef = useRef<ActionType>();
  const refresh = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  useEffect(() => {
    getPermissionsList();
  }, []);
  const editRole = (row) => {
    setEditVisible(true);
    const checkedKeyArr = row.permissions.map((item) => {
      return item.id;
    });
    setSelectRole(row);
    console.log(checkedKeyArr);
    setCheckedKeys(checkedKeyArr);
    // setSelectedKeys(checkedKeyArr);
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setSelectRole({ ...selectRole, permissions: checkedKeysValue });
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  const confirm = async () => {
    const res = await createRole(selectRole);
    if (res.status === 200) {
      setEditVisible(false);
      refresh();
    }
    console.log(res);

    message.success('Click on Yes');
  };

  const cancel = () => {
    setSelectRole({});
    message.error('Click on No');
  };

  return (
    <PageContainer
      header={{
        title: '权限管理',
      }}
    >
      <ProList<DataItem>
        rowKey="id"
        dataSource={dataSource}
        showActions="hover"
        onDataSourceChange={setDataSource}
        actionRef={actionRef}
        request={getRolesList}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: 'desc',
          },
          subTitle: {
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{row.createTime}</Tag>
                  <Tag color="#5BD8A6">{row.updateTime}</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <Button type="link" onClick={() => editRole(row)} key="link">
                编辑权限
              </Button>,
              <Button danger key="del" type="text">
                删除
              </Button>,
            ],
          },
        }}
      />
      <AddForm
        modalVisible={editVisible}
        onCancel={() => setEditVisible(false)}
        width={800}
      >
        <div className="role-container-editor-form">
          <div className="role-container-editor-form-item">
            <div className="role-container-editor-form-item-left">name</div>
            <div className="role-container-editor-form-item-right">
              <Input
                value={selectRole?.name}
                onChange={(e) => {
                  setSelectRole({ ...selectRole, name: e.currentTarget.value });
                }}
              />
            </div>
          </div>
          <div className="role-container-editor-form-item">
            <div className="role-container-editor-form-item-left">desc</div>
            <div className="role-container-editor-form-item-right">
              <Input.TextArea
                value={selectRole?.desc}
                onChange={(e) => {
                  setSelectRole({ ...selectRole, desc: e.currentTarget.value });
                }}
              />
            </div>
          </div>
          <div className="role-container-editor-form-item">
            <div className="role-container-editor-form-item-left">
              permission
            </div>
            <div className="role-container-editor-form-item-right">
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                fieldNames={{ title: 'desc', key: 'id' }}
                selectedKeys={selectedKeys}
                treeData={treeData}
              />
            </div>
          </div>
          <div className="role-container-editor-form-bottom">
            <Popconfirm
              title="提示"
              description="是否确认修改权限"
              onConfirm={confirm}
              onCancel={cancel}
              okText="确认"
              cancelText="取消"
            >
              <Button
                className="role-container-editor-form-bottom-button"
                danger
              >
                保存
              </Button>
            </Popconfirm>

            <Button
              className="role-container-editor-form-bottom-button"
              type="primary"
              onClick={() => setEditVisible(false)}
            >
              取消
            </Button>
          </div>
        </div>
      </AddForm>
    </PageContainer>
  );
};
export default Role;
