import { View, Text } from 'react-native';
import BookmarkButton from './BookmarkButton';
import { COLOR } from './color';

export default ({
  isBookmarked,
  onPressBoomark,
  num,
  directionDescription,
  numColor
}) => {
  return (
    <View style={{flexDirection: "row"}}>
      <View style={{flex:1, flexDirection:"row", alignItems: 'center'}}>
        {/* 북마크 */}
        <BookmarkButton 
        isBookmarked={isBookmarked}
        onPress={onPressBoomark}
        style={{paddingHorizontal: 10}}
        />
        {/* 버스번호, 방향 */}
        <View>
          <Text style={{color: numColor, fontSize: 20}}>{num}</Text>
          <Text style={{fontSize: 13, color:COLOR.GRAY_3}}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={{flex:1}}>

      </View>
    </View>
  )
};