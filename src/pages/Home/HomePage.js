import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import {
    getAll,
    getAllByTag,
    getAllTags,
    search
} from '../../services/articleServices';



const initialState = { articles: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'ARTICLES_LOADED':
            return { ...state, articles: action.payload };

        case 'TAGS_LOADED':
            return { ...state, tags: action.payload };


        default:
            return state;
    }
}
export default function HomePage() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { articles, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect(() => {
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

        const loadArticles = tag
            ? getAllByTag(tag)
            : searchTerm
                ? search(searchTerm)
                : getAll();

        loadArticles.then(articles => dispatch({ type: 'ARTICLES_LOADED', payload: articles }));

    }, [searchTerm, tag]);

    return (
        <>
            <Search />
            <Tags tags={tags} />
            <Thumbnails articles={articles} />
        </>
    );

}