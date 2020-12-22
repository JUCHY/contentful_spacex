import React from 'react';
import { fetchEntries } from '@utils/getLaunchdata';
import { fetchEntries  as pathEntries } from '@utils/contentfulLaunches';
import Layout from '@components/Layout';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/Home.module.css';

// source: http://web.archive.org/web/20160926134334/http://lasnv.net/foro/839/Javascript_parsear_URL_de_YouTube
// Youtuber Parser, parses any type of Youtube URL and returns id
//
//

function youtubeParser(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export default function Launch({ launch }) {
  const {
    flightNumber,
    launchDate,
    name,
    launchDetails,
    missionPatchUrl,
    missionSuccess,
    rocketName,
    rocketType,
    webcastVideoUrl,
    launchVideoUrl,
  } = launch[0].fields;
  const webcastVideoId = youtubeParser(webcastVideoUrl);
  const launchVideoId = youtubeParser(launchVideoUrl);
  return (
    <Layout>
      <div className={styles.staticContainer}>
        <div className={styles.backBtn}><Link href="/" passHref><Button variant="primary" color="secondary">BACK</Button></Link></div>
        <img className={styles.cardLogo} src={missionPatchUrl} alt={`${name} Mission Patch`} />
        <div className={styles.cardLogoName}>{name}</div>
        <div className={styles.cardSubtitle}>
          { new Date(launchDate).toDateString()}
          {' '}
          | Flight Number :
          {' '}
          {flightNumber}
        </div>
        <div className={styles.cardSubtitle}>{missionSuccess ? 'Mission Succeeded' : 'Mission Failed'}</div>
        <div className={styles.subContainer}>
          <div className={styles.leftSection}>
            <div className={styles.cardSubHeading}>Launch Details</div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.cardSubtitle}>{rocketName}</div>
            <div className={styles.cardSubtitle}>{rocketType}</div>
          </div>
        </div>
        <hr />
        <div className={styles.cardTextBody}>{launchDetails}</div>
        <div className={styles.cardSubHeading}>Webcast Video</div>
        <hr />
        <iframe width="100%" height={500} title={`${name} Webcast Video`} className={styles.center} src={`https://www.youtube.com/embed/${webcastVideoId}`} />
        <div className={styles.cardSubHeading}>Launch Video</div>
        <hr />
        <iframe width="100%" height={500} title={`${name} Launch Video`} className={styles.center} src={`https://www.youtube.com/embed/${launchVideoId}`} />
      </div>
    </Layout>
  );
}

Launch.propTypes = {
  launch: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      flightNumber: PropTypes.number.isRequired,
      launchDate: PropTypes.string.isRequired,
      launchDetails: PropTypes.string.isRequired,
      missionSuccess: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired.isRequired,
      missionPatchUrl: PropTypes.string.isRequired,
      rocketName: PropTypes.string.isRequired,
      rocketType: PropTypes.string.isRequired,
      webcastVideoUrl: PropTypes.string,
      launchVideoUrl: PropTypes.string,
    }).isRequired,
  }).isRequired).isRequired,
};

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetchEntries(id);

  return {
    props: {
      launch: res,
    },
  };
}

export async function getStaticPaths() {
  const res = await pathEntries('launch');
  const launches = res.map((p) => p);

  const paths = launches.map(launch => ({
      params: {id: `${launch.sys.id}`},
  }));

  return {paths, fallback: false}
}