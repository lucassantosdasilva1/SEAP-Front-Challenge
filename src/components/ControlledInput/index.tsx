import React from 'react';

import { Controller, Control } from "react-hook-form";
import {Input, InputProps} from 'antd'

import styles from './controlledInput.module.scss';

interface FormData extends InputProps {
    control: Control;
    name: string;
    error: number;
  }

export function ControlledInput({ control, name, error, ...rest }: FormData) {
  return (
    <div className={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Input className={styles.ContentInput} onChange={onChange} {...rest} />
        )}
      />
    </div>
  );
}