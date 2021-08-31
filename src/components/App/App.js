import logo from '../../logo.svg';
import './App.css';
import Posts from '../Posts/Posts';
import { useEffect } from 'react';
import { getPosts } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/app/actions';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      getPosts().then((res) => {
        console.log(res)
        dispatch(addPost(res));
      })
    } catch (e) {
      console.error('error', e);
    }

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Posts />
    </div>
  );
}

export default App;
