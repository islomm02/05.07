import React, { useState } from 'react';
import {
  useGetStacksQuery,
  useCreateStackMutation,
  useUpdateStackMutation,
  useDeleteStackMutation,
} from '../services/stackApi';
import { Table, Button, Input, Space, Modal, message, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StackList = () => {
  const { data: stacks, isLoading } = useGetStacksQuery();
  const [createStack] = useCreateStackMutation();
  const [updateStack] = useUpdateStackMutation();
  const [deleteStack] = useDeleteStackMutation();

  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<{ id: number; name: string } | null>(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createStack({ name: newName });
    setNewName('');
    message.success('Stack qo‘shildi');
  };

  const handleUpdate = async () => {
    if (editing) {
      await updateStack({ id: editing.id, body: { name: editing.name } });
      setEditing(null);
      message.success('Stack yangilandi');
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: 'Haqiqatan o‘chirmoqchimisiz?',
      onOk: async () => {
        await deleteStack(id);
        message.success('Stack o‘chirildi');
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => setEditing(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>📦 Texnologiyalar ro‘yxati (Stacks)</Title>

      <Space style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Yangi Stack nomi"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Qo‘shish
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={stacks?.data ?? []}
        loading={isLoading}
        rowKey="id"
        bordered
      />

      <Modal
        title="Stackni tahrirlash"
        open={!!editing}
        onCancel={() => setEditing(null)}
        onOk={handleUpdate}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Input
          value={editing?.name}
          onChange={(e) =>
            setEditing({ ...editing!, name: e.target.value })
          }
        />
      </Modal>
    </div>
  );
};

export default StackList;
