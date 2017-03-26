import React from 'react';
import { Link } from 'react-router-dom';
import { href } from '../services/base-href.service';

const styles = {
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  li: {
    float: 'left',
  },
  a: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
  },
};

export default () => (
  <ul style={styles.ul}>
    <li style={styles.li}>
      <Link style={styles.a}
            to={href}>root</Link>
    </li>
    <li style={styles.li}>
      <Link style={styles.a}
            to={href + 'home'}>home</Link>
    </li>
    <li style={styles.li}>
      <Link style={styles.a}
            to={href + 'not-found'}>not-found</Link>
    </li>
  </ul>
);
