import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface AddFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  width: number;
}

const AddForm: React.FC<PropsWithChildren<AddFormProps>> = (props) => {
  const { modalVisible, onCancel,width } = props;

  return (
    <Modal
      destroyOnClose
      title="新建"
      width={width}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default AddForm;
