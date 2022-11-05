import dynamic from 'next/dynamic';

const TicTacToe = dynamic(
  () => import('./components/board'),
  { ssr: false }
)

const IndexPage = () => { 
  return (
    <TicTacToe />
  )
}

export default IndexPage