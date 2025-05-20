// src/components/customRenderers.jsx
import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const renderEstadoLaboral = (params) => {
  const value = params.value?.toLowerCase();

  if (value === 'activo') {
    return (
      <Tag icon={<CheckCircleOutlined />} color="green">
        Activo
      </Tag>
    );
  }

  if (value === 'inactivo') {
    return (
      <Tag icon={<CloseCircleOutlined />} color="red">
        Inactivo
      </Tag>
    );
  }

  return <Tag>{params.value}</Tag>;
};
