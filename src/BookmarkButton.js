import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLOR } from './color';
import { useState } from 'react';

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!initialIsBookmarked);
  
  return {
    isBookmarked,
    toggleIsBookmarked
  }
  };


export default ({NEWCOLOR, size, onPress, isBookmarked : isBookmarkedProp, style}) => {
  const {isBookmarked, toggleIsBookmarked} = useBookmark(isBookmarkedProp);
  
  return (
    <TouchableOpacity style={style} onPress={() => {
      toggleIsBookmarked();
      onPress();
    }
    }>
      <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4} />
    </TouchableOpacity>
  )
};