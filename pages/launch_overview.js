import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class LaunchOverview extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const { launchDate, name, launchDetails, missionPatchUrl} = this.props.launch;
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Img variant="top" src={missionPatchUrl}></Card.Img>
                    <Card.Text>{launchDetails}</Card.Text>
                    <Button  href={`/launch_overview/${name}`} variant="primary" >Learn More</Button>
                </Card.Body>
            </Card>

        )
    }
}

export default LaunchOverview;