import { useState } from 'react';
import Head from 'next/head'
import { CanvasClient } from '@uniformdev/canvas';
import { Composition, Slot } from '@uniformdev/canvas-react';

import styles from '../styles/Home.module.scss'

import posts from '../data/posts.json';

export default function Home({ composition }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Space Jelly Blog</title>
        <meta name="description" content="Awesome tutorials!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My Space Jelly Blog
        </h1>

        <Composition data={composition} resolveRenderer={() => {
          const DefaultComponent = ({ headline, body, linkUrl, linkTitle }) => {
            return (
              <div className={styles.signup}>
                <div className={styles.signupBody}>
                  <h2>{ headline }</h2>
                  <p>{ body }</p>
                </div>
                <div className={styles.signupCta}>
                  <p>
                    <a href={linkUrl}>{ linkTitle }</a>
                  </p>
                </div>
              </div>
            );
          };
          return DefaultComponent;
        }}>
          <Slot name="promo" />
        </Composition>

        <ul className={styles.posts}>
          {posts.map(post => {
            return (
              <li key={post.id}>
                <a href={`https://spacejelly.dev/posts/${post.slug}`}>
                  <h3 className={styles.postTitle}>{ post.title }</h3>
                  <p className={styles.postDate}>{ new Date(post.date).toDateString() }</p>
                  <div className={styles.postExcerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </a>
              </li>
            )
          })}
        </ul>

      </main>

      <footer className={styles.footer}>
        <p>Find the tutorial on <a href="https://spacejelly.dev/">spacejelly.dev</a>!</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await client.getCompositionBySlug({
    slug: 'homepage',
  });

  return {
    props: {
      composition
    }
  }
}