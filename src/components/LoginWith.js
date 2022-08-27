import React from 'react';
import styles from '@styles/Components/LoginWith.module.scss';

const LoginWith = ({ to, provider, providerLogo }) => {
  return (
    <div className={styles.container}>
      <img className={styles.providerLogo} src={providerLogo} />
      <a className={styles.provider} href={to}>
        Ingresar con {provider}
      </a>
    </div>
  );
};

export default LoginWith;
