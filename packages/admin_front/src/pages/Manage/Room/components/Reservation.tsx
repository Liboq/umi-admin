import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface ReservationFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const ReservationForm: React.FC<PropsWithChildren<ReservationFormProps>> = (
  props,
) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default ReservationForm;
