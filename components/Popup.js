import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styles from '../styles/custom.module.css';

function youtubeParser(url) {
  if (!url) return '';
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

function Popup({ launch, close }) {
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
  } = launch;
  const webcastVideoId = youtubeParser(webcastVideoUrl);
  const launchVideoId = youtubeParser(launchVideoUrl);

  return (
    <div className={styles.popup_inner}>
      <div className={styles.popup_card}>
        <div className={styles.backBtn}><Button onClick={close} variant="primary" color="secondary">BACK</Button></div>
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
    </div>

  );
}

Popup.propTypes = {
  launch: PropTypes.shape({
    name: PropTypes.string,
    launchDetails: PropTypes.string,
    missionPatchUrl: PropTypes.string,
    flightNumber: PropTypes.number,
    launchDate: PropTypes.string,
    missionSuccess: PropTypes.bool,
    rocketName: PropTypes.string,
    rocketType: PropTypes.string,
    webcastVideoUrl: PropTypes.string,
    launchVideoUrl: PropTypes.string,
  }).isRequired,
  close: PropTypes.func.isRequired,
};

export default Popup;
