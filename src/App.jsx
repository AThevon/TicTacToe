import './App.css';
import Board from './components/Board';
import githubLogo from './assets/github-circle.svg';






function App() {

  return (
    <>
    <Board />
    <a className='gitlink' href="https://github.com/AThevon" target="_blank" rel="noopener noreferrer">
      <img src={githubLogo} alt="" />
      </a>
    </>
  );
}

export default App;
