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
      getPosts()
      .then((res) => {
        dispatch(addPost(res));
      })
    } catch (e) {
      console.error('error', e);
    }

  })

  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;
