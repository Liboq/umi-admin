import AddForm from '@/components/Modal/Add';
import {
  createRoomCategory,
  getRoomCategoryInfo,
  getRoomCategoryList,
} from '@/utils/request/room/caregory';
import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProForm,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { Button, Drawer, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

type Category = {
  id: number;
  name: string;
  desciption: string;
  state: boolean;
};

const Category = () => {
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [category, setCategory] = useState<Category>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.RoomInfo>[] = [
    {
      title: '类别名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'avator',
      valueType: 'avatar',
    },
  ];
  const getCategory = async (id: number) => {
    const res = await getRoomCategoryInfo(id);
    return res;
  };
  const getCategoryList = async () => {
    const res = await getRoomCategoryList();

    return res;
  };
  const handleAdd = async (form: Category) => {
    const res = await createRoomCategory(form);
    if (res.status === 200) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
      setAddVisible(false);
    }
  };
  return (
    <PageContainer
      header={{
        title: '客房类型管理',
      }}
    >
      <ProList<Category>
        toolBarRender={() => {
          return [
            <Button key="3" onClick={() => setAddVisible(true)} type="primary">
              新建
            </Button>,
          ];
        }}
        search={{}}
        rowKey="id"
        headerTitle="类别列表"
        request={getCategoryList}
        pagination={{
          pageSize: 5,
        }}
        actionRef={actionRef}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'name',
            title: '名称',
          },
          avatar: {
            dataIndex: 'avator',
            search: false,
          },
          description: {
            dataIndex: 'description',
            search: false,
          },
          subTitle: {
            dataIndex: 'state',
            render: (_, row) => {
              return (
                <Space size={0}>
                  {row.state ? (
                    <Tag color="blue">正开启</Tag>
                  ) : (
                    <Tag color="red">已关闭</Tag>
                  )}
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              <a
                target="_blank"
                onClick={() => {
                  setCategory(row);
                  setEditVisible(true);
                }}
                rel="noopener noreferrer"
                key="id"
              >
                编辑
              </a>,
            ],
            search: false,
          },
        }}
      />
      <AddForm width={420} onCancel={() => setAddVisible(false)} modalVisible={addVisible}>
        <ProForm
          initialValues={{
            name: '',
            description: '',
            avator: '',
            state: true,
          }}
          onFinish={handleAdd}
        >
          <ProForm.Group>
            <ProFormText
              name="name"
              width="md"
              label="名称"
              placeholder="请输入名称"
            />
            <ProFormText
              name="description"
              width="md"
              label="描述"
              placeholder="请输入描述内容"
            />
            <ProFormText
              name="avator"
              width="md"
              label="图片地址"
              placeholder="请输入图片地址"
            />
          </ProForm.Group>
        </ProForm>
      </AddForm>
      <Drawer
        width={800}
        open={editVisible}
        onClose={() => {
          setEditVisible(false);
        }}
        closable={true}
      >
        {editVisible && (
          <PageContainer
            header={{
              title: '编辑',
            }}
          >
            <ProDescriptions<Category>
              column={2}
              title={category?.name}
              request={() => getCategory(category!.id)}
              params={{
                id: category?.id,
              }}
              columns={columns}
            />
          </PageContainer>
        )}
      </Drawer>
    </PageContainer>
  );
};
export default Category;
