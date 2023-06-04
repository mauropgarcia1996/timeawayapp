import React, {memo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
type TimeBoxesProps = {
  elapsedTime: number | null;
  numberOfBoxes: number;
};
const TimeBoxes: React.FC<TimeBoxesProps> = ({elapsedTime, numberOfBoxes}) => {
  const DATA = Array.from(Array(numberOfBoxes).keys()).map((item, index) => ({
    number: item,
    id: index,
  }));
  const renderItem = ({item}) => {
    if (numberOfBoxes === 90) {
      return <BigBox item={item} elapsedTime={elapsedTime} />;
    }
    if (numberOfBoxes === 1080) {
      return <SmallBox item={item} elapsedTime={elapsedTime} />;
    }
    if (numberOfBoxes === 4680) {
      return <VerySmallBox item={item} elapsedTime={elapsedTime} />;
    }
  };
  const getNumColums = () => {
    if (numberOfBoxes === 90) {
      return 9;
    }
    if (numberOfBoxes === 1080) {
      return 30;
    }
    if (numberOfBoxes === 4680) {
      return 60;
    }
  };
  return (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}
      numColumns={getNumColums()}
      key={numberOfBoxes}
      data={DATA}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
    />
  );
};

const BigBox = ({elapsedTime, item}) => (
  <View style={styles().boxContainer}>
    <View style={styles(elapsedTime, item.number).box} />
  </View>
);

const SmallBox = ({elapsedTime, item}) => (
  <View style={styles().smallBoxContainer}>
    <View style={styles(elapsedTime, item.number).smallBox} />
  </View>
);

const VerySmallBox = ({elapsedTime, item}) => (
  <View style={styles().verySmallBoxContainer}>
    <View style={styles(elapsedTime, item.number).verySmallBox} />
  </View>
);

export default memo(TimeBoxes);
const styles = (elapsedTime?: number | null, item?: number) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'center',
    },
    boxContainer: {
      width: 32,
      marginHorizontal: 1,
    },
    box: {
      height: 32,
      width: 32,
      margin: 1,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: item < elapsedTime ? 'red' : 'transparent',
    },
    smallBoxContainer: {
      width: 8,
      marginHorizontal: 1,
    },
    smallBox: {
      height: 8,
      width: 8,
      margin: 1,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: item < elapsedTime ? 'red' : 'transparent',
    },
    verySmallBoxContainer: {
      width: 4,
      marginHorizontal: 1,
    },
    verySmallBox: {
      height: 4,
      width: 4,
      margin: 1,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: item < elapsedTime ? 'red' : 'transparent',
    },
  });
