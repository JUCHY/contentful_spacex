/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Image } from 'next/image';
import styles from '../styles/custom.module.css';

function getStyle(inViewport, enterCount) {
  // Fade in only the first time we enter the viewport
  if (inViewport && enterCount === 1) {
    return {
      WebkitTransition: 'opacity 0.75s ease-in-out',
      width: '18rem',
    };
  } if (!inViewport && enterCount < 1) {
    return { WebkitTransition: 'none', opacity: '0' };
  }
  return {};
}

function LaunchCard({
  launch, inViewport, enterCount, forwardedRef, sendLaunchdata, open,
}) {
  const {
    name, launchDetails, missionPatchUrl,
  } = launch.fields;
  const { id } = launch.sys;
  const handlePopupClick = () => {
    open();
    sendLaunchdata(launch);
  };

  return (
    <>
      <Card style={getStyle(inViewport, enterCount)} ref={forwardedRef}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img as={Image} unoptimized loading="lazy" layout="fill" variant="top" src={missionPatchUrl} alt={`${name} Mission Patch`} />
          <Card.Text>{launchDetails}</Card.Text>
          <div className={styles.flex}>
            <Button href={`/launch_overview/${id}`} variant="danger">Learn More</Button>
            <Button onClick={handlePopupClick} variant="primary">View Popup</Button>
          </div>
        </Card.Body>

      </Card>
    </>

  );
}

LaunchCard.propTypes = {
  launch: PropTypes.shape({
    fields: PropTypes.shape({
      name: PropTypes.string,
      launchDetails: PropTypes.string,
      missionPatchUrl: PropTypes.string,
    }).isRequired,
    sys: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  inViewport: PropTypes.bool.isRequired,
  enterCount: PropTypes.number.isRequired,
  forwardedRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  open: PropTypes.func.isRequired,
  sendLaunchdata: PropTypes.func.isRequired,
};

export default LaunchCard;
