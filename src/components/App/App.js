import './App.css';
import '../../index.css';
import Posts from '../Posts/Posts';
import { useLayoutEffect, useRef, useCallback, useState } from 'react';
import { getPostsId, getData } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { addPost, updateLoadingState } from '../../store/app/actions';
import PostCard from '../PostCard/PostCard';


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ref, setRef] = useState(null);


  useLayoutEffect(() => {
    getPosts();
    setRef(setInterval(getPosts, 60000));

    return () => {
      if (ref) {
        clearInterval(ref);
      }
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
        })
      })
    .catch(err => {
      dispatch(updateLoadingState(false));
      console.error('error', err);
    })
  }

  const handleRefreshClick = useCallback(() => {
    clearInterval(ref);
    getPosts();
    setRef(setInterval(getPosts, 60000));
  }, [ref]);

  const handleGoBack = () => {
    history.goBack();

    setRef(setInterval(getPosts, 60000));
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/"
          render={(routeProps) => <Posts {...{...routeProps, handleRefreshClick}} />}
        />
        <Route
          path="/:id"
          render={(routeProps) => (
            <PostCard
              {...{
                ...routeProps,
                handleGoBack,
                interval: ref,
              }}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
