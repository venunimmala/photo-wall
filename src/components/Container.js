import React from 'react';
import {loadFlickrPublicFeed, loadYandexPublicFeed} from '../actions/photos';
import {photoStore} from '../stores';
import FeedView from './FeedView';
import styles from './Container.css';


class Container extends React.Component {
    constructor() {
        super();

        this.state = {
            photos : photoStore.getAll()
        };
    }

    componentDidMount() {
        photoStore.addChangeListener(this.change);

        loadYandexPublicFeed();
        loadFlickrPublicFeed();
    }

    componentWillUnmount() {
        photoStore.removeChangeListener(this.change);
    }

    change = () => {
        this.setState({
            photos : photoStore.getAll()
        })
    };


    render() {
        const {photos} = this.state;
        return (
            <div>
                <h1>Fotovägg </h1>
                <header class="island">                   
                   <form action="/search" method="get" role="search">
                      <label for="query">Search:</label>
                      <input type="search" name="query" id="query" placeholder="Search" required />
                      <input type="submit" value="Search" />
                   </form>
                </header>
                <FeedView photos={photos}/>
            </div>
        );
    }
}

export default Container;