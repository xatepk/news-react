import './App.css';
import '../../index.css';
import Posts from '../Posts/Posts';
import { useEffect, useRef, useCallback } from 'react';
import { getPostsId, getData } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { addPost, updateLoadingState } from '../../store/app/actions';
import PostCard from '../PostCard/PostCard';


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const intervalRef = useRef();

  useEffect(() => {
    history.push('./');
    intervalRef.current = setInterval(getPosts, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };

  }, []);

  const getPosts = () => {
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
  }

  const handleRefreshClick = useCallback(() => {
    clearInterval(intervalRef.current);
    const interval = setInterval(getPosts, 5000);
    intervalRef.current = interval;
  }, [intervalRef]);

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/"
          component={(routeProps) => <Posts {...{...routeProps, handleRefreshClick}} />}
        />
        <Route
          path="/posts/:id"
          component={PostCard}
          handleGoBack={handleGoBack} />
      </Switch>
    </div>
  );
}

export default App;
