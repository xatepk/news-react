import './App.css';
import Posts from '../Posts/Posts';
import { useEffect } from 'react';
import { getPosts, getPostsId } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { addPost, updateLoadingState } from '../../store/app/actions';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      getPostsId()
        .then((res) => {
          getPosts(res)
          .then((res) => {
            res.sort((a, b) => a.score < b.score ? 1 : -1);
            dispatch(addPost(res));
          })
          .catch(err => {
            dispatch(updateLoadingState(false));
            console.log('---', err);

          })
        })
      .catch(err => {
        dispatch(updateLoadingState(false));
        console.error('error', err);
      })
  })

  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;
