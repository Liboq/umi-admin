import services from '@/services/demo';
import { createReservation } from '@/utils/request/Reservation';
import { createRoom, getRoomList } from '@/utils/request/room';
import { getRoomCategoryList } from '@/utils/request/room/caregory';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptionsItemProps,
  ProForm,
  ProFormDateRangePicker,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { queryReservation } from '../../../utils/request/Reservation/index';
import CreateForm from './components/CreateForm';
import ReservationForm from './components/Reservation';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const { deleteRoom, modifyRoom } = services.RoomController;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RoomInfoVO) => {
  const hide = message.loading('正在添加');
  try {
    await createRoom({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleReservation = async (fields: API.ReservationInfoVO) => {
  const hide = message.loading('正在预定');
  try {
    await createReservation({ ...fields });
    hide();
    message.success('预定成功');
    return true;
  } catch (error) {
    hide();
    message.error('预定失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await modifyRoom(
      {
        RoomId: fields.id || '',
      },
      {
        name: fields.name || '',
        type: fields.nickName || '',
      },
    );
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RoomInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteRoom({
      RoomId: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const Room: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [reservationModalVisible, handleReservationModalVisible] =
    useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [descVisible, handledescVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const bookingRef = useRef<ActionType>();

  const [typeList, setTypeList] = useState({});
  const [row, setRow] = useState<API.RoomInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RoomInfo[]>([]);

  const queryRoomList = async (params: API.RoomInfoVO) => {
    console.log(params);

    const { data, success } = await getRoomList(params);
    return {
      data: data || [],
      success,
    };
  };
  const getTypeList = useCallback(async () => {
    const res = await getRoomCategoryList();
    let typeOptionList: Record<string, string> = {};
    res.data.forEach(({ id, name, ...reset }: any) => {
      typeOptionList[id] = { ...reset, text: name };
    });
    setTypeList(typeOptionList);
  }, []);
  const queryReservationList = async (params: any) => {
    const query: { roomId: number } = { roomId: row!.id, ...params };
    const { data, success } = await queryReservation(query);
    return {
      data,
      success,
    };
  };
  const columns: ProDescriptionsItemProps<API.RoomInfo>[] = [
    {
      title: '房间名称',
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
      title: '类型',
      dataIndex: 'typeId',
      valueEnum: typeList,
    },
    { title: '价格', dataIndex: 'price', valueType: 'text' },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '空闲' },
        1: { text: '已预订' },
        2: { text: '已入住' },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <>
            <a
              onClick={() => {
                setRow(record);
                handleReservationModalVisible(true);
              }}
            >
              预定
            </a>
            <Divider type="vertical" />
          </>

          <>
            <a
              onClick={() => {
                setRow(record);
                handledescVisible(true);
                if (bookingRef.current) {
                  bookingRef.current.reload();
                }
              }}
              href="#"
            >
              查看
            </a>
          </>
        </>
      ),
    },
  ];
  const bookingColums: ProDescriptionsItemProps<API.ReservationInfo>[] = [
    {
      title: '顾客名称',
      dataIndex: 'customerName',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '空闲' },
        1: { text: '已预订' },
        2: { text: '已入住' },
      },
    },
    {
      title: '入住日期',
      dataIndex: 'checkInDate',
      valueType: 'date',
    },
    {
      title: '退房日期',
      dataIndex: 'checkOutDate',
      valueType: 'date',
    },
  ];
  const handleBooking = async (form: any) => {
    const { dateRange, customerName } = form;
    console.log(customerName);

    const params: API.ReservationInfoVO = {
      roomId: row!.id,
      customerName: customerName || '',
      checkInDate: new Date(dateRange[0]),
      checkOutDate: new Date(dateRange[1]),
    };
    await handleReservation(params);
    handleReservationModalVisible(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    return true;
  };
  useEffect(() => {
    getTypeList();
  }, []);

  return (
    <PageContainer
      header={{
        title: '客房管理',
      }}
    >
      <ProTable<API.RoomInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={queryRoomList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.RoomInfoVO, API.RoomInfoVO>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <ReservationForm
        onCancel={() => handleReservationModalVisible(false)}
        modalVisible={reservationModalVisible}
      >
        <ProForm
          initialValues={{
            dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
            customerName: '',
            roomName: row?.name,
          }}
          onFinish={handleBooking}
        >
          <ProForm.Group>
            <ProFormText
              name="roomName"
              width="md"
              label="房间号"
              placeholder="请输入房间号"
              disabled
            />
            <ProFormText
              name="customerName"
              width="md"
              label="顾客名字"
              placeholder="请输入顾客名字"
            />
            <ProFormDateRangePicker
              fieldProps={{
                format: (value) => value.format('YYYY-MM-DD'),
              }}
              width="md"
              name="dateRange"
              label="预定时间范围"
            />
          </ProForm.Group>
        </ProForm>
      </ReservationForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={800}
        open={descVisible}
        onClose={() => {
          handledescVisible(false);
        }}
        closable={true}
      >
        {row?.name && (
          <PageContainer
            header={{
              title: row.name + '房间',
            }}
          >
            <ProTable
              rowKey="id"
              headerTitle="查询表格"
              actionRef={bookingRef}
              columns={bookingColums}
              request={queryReservationList}
              search={{
                labelWidth: 120,
              }}
            ></ProTable>
          </PageContainer>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Room;
