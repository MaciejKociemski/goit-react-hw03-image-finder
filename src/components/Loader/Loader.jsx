import React from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Oval visible={true} color="#00BFFF" height={100} width={120} alignIt />
    </div>
  );
};
