import React from 'react';
import { fetchEntries } from '@utils/contentfulLaunches';
import LaunchCard from '@components/LaunchCard';
import Layout from '@components/Layout';
import CardDeck from 'react-bootstrap/CardDeck';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';

function Home({ launches }) {
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h2>Space X Launches</h2>
        <p>
          Space Exploration Technologies Corp. is an American aerospace manufacturer and space
          transportation services company headquartered in Hawthorne, California.
          It was founded in 2002 by Elon Musk with the goal of reducing space transportation
          costs to enable the colonization of Mars.
        </p>
        <div>
          The goal of this website is to provide users easy access
          of information about SpaceX&apos;s rocket launches to users
          <div>
            V
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <img className={styles.cardLogo} alt="SpaceX Logo" src="\spacexlogo.jpg" />
        <div className={styles.cardLogoName}>SpaceX Launches</div>
        <form>
          <input type="text" />
        </form>
        <CardDeck>
          {launches.map((launch) => (
            <LaunchCard launch={launch} />

          ))}
        </CardDeck>

      </div>
    </Layout>

  );
}

Home.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getStaticProps() {
  const res = await fetchEntries('launch');
  const launches = res.map((p) => p);

  return {
    props: {
      launches,
    },
  };
}

export default Home;
