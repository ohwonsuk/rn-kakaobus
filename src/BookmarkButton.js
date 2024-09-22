import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLOR } from './color';

export default ({size, onPress, isBookmarked, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
    </TouchableOpacity>
  )
};