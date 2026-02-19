import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjRjNjUzY2UwZWUzYWY0ZDAwNDA2NGUxZmJhODZmMiIsIm5iZiI6MTc3MTM1MDQ5Ny44NjMwMDAyLCJzdWIiOiI2OTk0YTllMTA2ZGQ1YmNlMTMyODg0ZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rQP7x6kQVZQNdbV0qJ5ObxNs3oEEINg-4Ki76Zj8Gks'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'popular'}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : 'Popular on Netflix'} </h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards