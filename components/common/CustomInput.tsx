import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type MyTextInputProps = React.ComponentProps<typeof TextInput> & {
  //
};
const CustomInput: React.FC<MyTextInputProps> = props => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      mode="outlined"
      outlineStyle={styles.border}
    />
  );
};
export default CustomInput;

const styles = StyleSheet.create({
  border: {borderRadius: 15},
  input: {
    marginVertical: 5,
  },
});
