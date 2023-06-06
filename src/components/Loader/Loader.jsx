import React from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Oval
        visible={true}
        color="#FFA500"
        height={200}
        width={100}
        alignIt
        radius={10}
        strokeWidth={20}
      />
    </div>
  );
};
