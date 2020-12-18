import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from 'react';
import { render } from 'react-dom';


class Home extends React.Component() {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ul>
          <li>
          <Link href="/">
            <a>Homepage</a>
          </Link>
          </li>
          <li>
          <Link href="/launch-overview">
            <a>Launch Overview</a>
          </Link>
          </li>
        </ul>
        <div className="wrapper">
              <h2>Space X Launches</h2>
              <ul>
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            </div>

        </div>
      
  )
            }
}

export default Home;
