import './App.css';
import '../../index.css';
import Posts from '../Posts/Posts';
import { useEffect } from 'react';
import { getPostsId, getData } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { addPost, updateLoadingState } from '../../store/app/actions';
import PostCard from '../PostCard/PostCard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      getPostsId()
        .then((res) => {
          getData(res)
          .then((res) => {
            res.sort((a, b) => a.time < b.time ? 1 : -1);
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
        <Route exact path="/" component={Posts} />
        <Route path="/posts/:id" component={PostCard} />
      </Switch>
    </div>
  );
}

export default App;
