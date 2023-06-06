import React from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Oval
        visible={true}
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={1}
        strokeWidthSecondary={2000}
        color="blue"
        secondaryColor="red"
      />
    </div>
  );
};
