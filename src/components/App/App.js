import './App.css';
import '../../index.css';
import Posts from '../Posts/Posts';
import { useEffect } from 'react';
import { getPosts, getPostsId } from '../../utils/PostsApi';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { addPost, updateLoadingState } from '../../store/app/actions';
import PostCard from '../PostCard/PostCard';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      getPostsId()
        .then((res) => {
          getPosts(res)
          .then((res) => {
            console.log(res);


            res
            .sort((a, b) => a.time < b.time ? 1 : -1)
            .map(i => {
              console.log(i);
              const date = new Date( i.time * 1000 );
              const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
];
              i.time = `${monthNames[date.getMonth()]} ${date.getDay()} ${date.getFullYear()}`
            });
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
        <Route path="/posts/:id" component={PostCard} />
      </Switch>
    </div>
  );
}

export default App;
