import './App.scss';
import  Display from './components/Display/Display'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>The Drum Machine</p>
      </header>

      <main id='drum-machine' className='App-main'>
        <Display />
      </main>
      
    </div>
  );
}

export default App;
