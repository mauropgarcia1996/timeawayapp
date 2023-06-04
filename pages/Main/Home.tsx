import React, {useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Button, Menu, Surface, Text} from 'react-native-paper';
import TimeBoxes from '../../components/common/TimeBoxes';
import {calculateElapsedPercentage, calculateTime} from '../../utils';
import DatePicker from 'react-native-date-picker';

const TOTALS = {
  weeks: 4680,
  months: 1080,
  years: 90,
};
const Home = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date('2014-01-01'));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Years');
  const elapsedTime = useMemo(() => {
    return calculateTime(selected.toLowerCase(), date);
  }, [selected, date]);

  const elapsedPercentage = useMemo(() => {
    return calculateElapsedPercentage(
      elapsedTime,
      TOTALS[selected.toLowerCase()],
    ).toFixed(2);
  }, [selected, elapsedTime]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const TIME_BOX = {
    Weeks: (
      <TimeBoxes elapsedTime={elapsedTime} numberOfBoxes={TOTALS['weeks']} />
    ),
    Months: (
      <TimeBoxes elapsedTime={elapsedTime} numberOfBoxes={TOTALS['months']} />
    ),
    Years: (
      <TimeBoxes elapsedTime={elapsedTime} numberOfBoxes={TOTALS['years']} />
    ),
  };
  return (
    <View style={{paddingHorizontal: 20}}>
      <View>
        <View
          style={{
            paddingVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text variant="headlineSmall">Your birth: </Text>
          <Pressable
            style={{
              backgroundColor: '#acc18a',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{fontSize: 20}}>
              {date.toLocaleDateString('en-US')}
            </Text>
          </Pressable>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            locale="en_US"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginVertical: 10,
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                mode="contained-tonal"
                style={{borderRadius: 5}}
                contentStyle={{
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  backgroundColor: '#acc18a',
                }}
                labelStyle={{fontSize: 20}}
                textColor="black"
                onPress={openMenu}>
                {selected}
              </Button>
            }>
            <Menu.Item
              onPress={() => {
                setSelected('Weeks');
                closeMenu();
              }}
              title="Weeks"
            />
            <Menu.Item
              onPress={() => {
                setSelected('Months');
                closeMenu();
              }}
              title="Months"
            />
            <Menu.Item
              onPress={() => {
                setSelected('Years');
                closeMenu();
              }}
              title="Years"
            />
          </Menu>
        </View>
        <View>
          <Surface style={{padding: 10}}>
            <Text variant="headlineMedium" style={{marginVertical: 10}}>
              {selected}
            </Text>
            {TIME_BOX[selected]}
            {elapsedTime && (
              <Text variant="headlineSmall" style={{marginVertical: 10}}>
                {elapsedPercentage}% Completed
              </Text>
            )}
          </Surface>
        </View>
      </View>
    </View>
  );
};

export default Home;
