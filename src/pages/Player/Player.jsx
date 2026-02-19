import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: '',
        key: '',
        published_at: '',
        type: ''
    })

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjRjNjUzY2UwZWUzYWY0ZDAwNDA2NGUxZmJhODZmMiIsIm5iZiI6MTc3MTM1MDQ5Ny44NjMwMDAyLCJzdWIiOiI2OTk0YTllMTA2ZGQ1YmNlMTMyODg0ZDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rQP7x6kQVZQNdbV0qJ5ObxNs3oEEINg-4Ki76Zj8Gks'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    }, [])


    return (
        <div className='player'>
            <img src={back_arrow} alt="" onClick={() => navigate(-2)} />
            <iframe width='90%' height='90%'
                src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
            <div>
                <p>Movie Name: <span> {apiData.name}</span></p>
                <p>Release Date: <span> {apiData.published_at.slice(0, 10)}</span></p>
                <p>Type: <span> {apiData.type}</span></p>
            </div>
        </div >
    )
}

export default Player