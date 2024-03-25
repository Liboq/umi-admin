import AddForm from '@/components/Modal/Add';
import { createRole, getRoleList } from '@/utils/request/Role';
import { getUserList } from '@/utils/request/user';
import { ActionType, PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space, Tag, Tree, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './index.less';
import { listToTree } from '@/utils';
const defaultData = [
  {
    id: 1,
    name: 'admin',
    mobile: '1111111111',
    avator: '1111111',
    roles: [],
  },
];
type DataItem = {
  id: number;
  name: string;
  mobile: string;
  avator: string;
  roles: any[];
};
type DataItemList = Partial<DataItem>;
const Personnel = () => {
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
    const treeDatas = listToTree(res.data)
    setTreeData(treeDatas);
    return res;
  };
  const getUsersList = async () => {
    const res = await getUserList();
    console.log(res);
    setDataSource(res.data);
    return res;
  };
  const actionRef = useRef<ActionType>();
  const refresh = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  useEffect(() => {
    getRolesList();
  }, []);
  const editRole = (row) => {
    setEditVisible(true);
    const checkedKeyArr = row.roles.map((item) => {
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
    setSelectRole({ ...selectRole, roles: checkedKeysValue });
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
        request={getUsersList}
        metas={{
          avatar: {
            dataIndex: 'avator',
          },
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: 'mobile',
          },
          subTitle: {
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{row.roles[0]?.name || '暂无角色'}</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <Button type="link" onClick={() => editRole(row)} key="link">
                编辑角色
              </Button>,
              <Button danger key="link" type="text">
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
            <div className="role-container-editor-form-item-left">mobile</div>
            <div className="role-container-editor-form-item-right">
              <Input.TextArea
                value={selectRole?.mobile}
                onChange={(e) => {
                  setSelectRole({ ...selectRole, mobile: e.currentTarget.value });
                }}
              />
            </div>
          </div>
          <div className="role-container-editor-form-item">
            <div className="role-container-editor-form-item-left">
              roles
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
              description="是否确认修改角色"
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
export default Personnel;
