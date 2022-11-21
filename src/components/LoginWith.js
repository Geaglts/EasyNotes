import styles from '@styles/Components/LoginWith.module.scss';

const LoginWith = ({ to, provider, providerLogo }) => {
  return (
    <a className={styles.container} href={to}>
      <img className={styles.providerLogo} src={providerLogo} />
      <span className={styles.provider}>Ingresar con {provider}</span>
    </a>
  );
};

export default LoginWith;
