import React, { useRef, useState } from 'react';
import { fetchEntries } from '@utils/contentfulLaunches';
import LaunchCard from '@components/LaunchCard';
import Layout from '@components/Layout';
import CardDeck from 'react-bootstrap/CardDeck';
import Popup from '@components/Popup.js';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import handleViewport from 'react-in-viewport';
import styles from '../styles/custom.module.css';

const ViewCard = handleViewport(LaunchCard);

function Home({ launches }) {
  const main = useRef(null);
  const keywords = launches.map((launch) => launch.fields.name);
  const [filterName, changeFilter] = useState('');
  const [showPopup, togglePopup] = useState(false);
  const [currLaunch, changeLaunch] = useState(null);
  const toggle = () => { togglePopup(!showPopup); };
  Home.handleToggleOutside = () => { toggle(); };
  Home.changeLaunchOutside = (launch) => { changeLaunch(launch); };
  let renderLaunches = launches;

  if (filterName) {
    renderLaunches = renderLaunches
      .filter((launch) => launch.fields.name.toLowerCase().includes(filterName.toLowerCase()));
  }

  return (
    <Layout>
      <Head>
        <title>SpaceX Launches</title>
        <meta
          name="description"
          content="A website to provide easy access
        to information about SpaceX&apos;s rocket launches"
        />
        <meta name="keywords" content={`spaceX, launch, api, ${keywords.toString()}`} />
      </Head>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>SPACE X LAUNCHES</h1>
        <p>
          SPACE EXPLORATION TECHNOLOGIES CORP. IS AN AMERICAN AEROSPACE MANUFACTURER AND SPACE
          TRANSPORTATION SERVICES COMPANY HEADQUARTERED IN HAWTHORNE, CALIFORNIA.
          IT WAS FOUNDED IN 2002 BY ELON MUSK WITH THE GOAL OF REDUCING SPACE TRANSPORTATION
          COSTS TO ENABLE THE COLONIZATION OF MARS.
        </p>
        <div>
          The goal of this website is to provide easy access
          to information about SpaceX&apos;s rocket launches to users
        </div>
        {/* Icons made by <a href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"
          title="Flaticon"> www.flaticon.com</a> */}
        <FontAwesomeIcon icon={faCaretDown} id={styles.scrolldown} size="xs" onClick={() => { main.current.scrollIntoView({ behavior: 'smooth' }); }} />
      </div>
      <div ref={main} className={styles.container}>
        <img className={styles.Logo} alt="SpaceX Logo" src="\spacexlogo.jpg" />
        <hr />
        <div className={styles.LogoName}>SpaceX Launches</div>
        <hr />
        <label htmlFor="search">
          Search Launches
          <input id="search" name="search" type="text" value={filterName} onChange={(e) => { changeFilter(e.target.value); }} />
        </label>
        <CardDeck>
          {renderLaunches.map((launch) => (
            <ViewCard
              launch={launch}
              key={launch.sys.id}
              open={Home.handleToggleOutside}
              sendLaunchdata={Home.changeLaunchOutside}
            />

          ))}
        </CardDeck>
      </div>
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      {showPopup && (
      <div role="dialog" onClick={toggle} onKeyDown={toggle} className={styles.popup}>
        <Popup launch={currLaunch.fields} close={Home.handleToggleOutside} />
      </div>
      )}
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
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
