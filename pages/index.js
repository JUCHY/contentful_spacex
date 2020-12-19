import styles from '../styles/Home.module.css'
import React from 'react';
import { fetchEntries } from '@utils/contentfulLaunches'
import LaunchCard from '@components/LaunchCard'
import Layout from '@components/Layout'
import CardDeck from 'react-bootstrap/CardDeck'


class Home extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <Layout>
      <div className={styles.container}>
        <h2>Space X Launches</h2>
        <CardDeck>              
              {this.props.launches.map((node) => {
                console.log(node)
                return (
                        <LaunchCard launch={node}></LaunchCard>

                )
              })}
            </CardDeck>

        </div>
      </Layout>
      
    )
  }
}

export async function getStaticProps() {
  const res = await fetchEntries()
  console.log(res)
  const launches = await res.map((p) => {
    console.log(p)
    return p
  })

  return {
    props: {
      launches,
    },
  }
}

export default Home;
