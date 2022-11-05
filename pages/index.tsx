import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Tic-Tac-Toe
        </h1>

        <p className={styles.description}>
          <Link href="/tictactoe">Click Here to Play</Link>
        </p>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
