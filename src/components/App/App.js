import './App.css';
import Posts from '../Posts/Posts';
import Post from '../Post/Post'
import { useEffect } from 'react';
import { getPosts, getPostsId } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { addPost, updateLoadingState } from '../../store/app/actions';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      getPostsId()
        .then((res) => {
          getPosts(res)
          .then((res) => {
            console.log(res);

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
    <div className="page">
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </div>
  );
}

export default App;
