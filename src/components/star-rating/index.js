import React, {useState} from 'react'
import StarRatings from 'react-star-ratings'
import {getColor} from '../../functions/colors'

const Rating = ({initialRating = 0, numberOfStars = 5}) => {
  const [rating, setRating] = useState(initialRating)
  return (
    <StarRatings
      rating={rating}
      starRatedColor={getColor('bg-amber-500')}
      starEmptyColor={getColor('bg-grey-300')}
      starHoverColor={getColor('bg-grey-400')}
      starDimension="16px"
      starSpacing="3px"
      changeRating={setRating}
      numberOfStars={numberOfStars}
      name="stars"
    />
  )
}

export default Rating
