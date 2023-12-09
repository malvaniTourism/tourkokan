import React from 'react'
import MasonryGrid from '../../Components/Customs/MasonryGrid';

const ExploreGrid = ({ route }) => {
    const data = route.params.cities

    return (
        <MasonryGrid data={data} />
    )
}

export default ExploreGrid
