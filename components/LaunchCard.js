import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styles from '../styles/custom.module.css';

function LaunchCard(props) {
  const { launch } = props;
  const { name, launchDetails, missionPatchUrl } = launch.fields;
  const { id } = launch.sys;
  const handlePopupClick = () => {
    props.open();
    props.sendLaunchdata(launch);
  };

  return (
    <>
      <Card style={getStyle(props.inViewport, props.enterCount)} ref={props.forwardedRef}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img variant="top" src={missionPatchUrl} alt={`${name} Mission Patch`} />
          <Card.Text>{launchDetails}</Card.Text>
          <div className={styles.flex}>
            <Button href={`/launch_overview/${id}`} variant="danger">Learn More</Button>
            <Button onClick={handlePopupClick} variant="primary">View Now</Button>
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
};

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

export default LaunchCard;
