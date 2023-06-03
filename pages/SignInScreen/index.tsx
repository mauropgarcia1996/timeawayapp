import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {supabase} from '../../api/supabaseConfig';
import CustomInput from '../../components/common/CustomInput';
import {useAuthStore} from '../../store/authStore';
const SignInScreen = ({navigation}) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });
  const {setSession} = useAuthStore();
  const onSubmit = async userData => {
    try {
      let {data, error} = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
      setSession(data.session);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container} scrollEnabled={false}>
      <View>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          Sign In
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              defaultValue={value}
              label="Email"
              inputMode="email"
              textContentType="emailAddress"
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              onBlur={onBlur}
              onChangeText={onChange}
              defaultValue={value}
              label="Password"
              inputMode="text"
              textContentType="oneTimeCode"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Your passwords do no match';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              onBlur={onBlur}
              onChangeText={onChange}
              defaultValue={value}
              label="Repeat Password"
              inputMode="text"
              textContentType="oneTimeCode"
              secureTextEntry
            />
          )}
          name="repeatPassword"
        />
        {errors.repeatPassword && <Text>This is required.</Text>}
        <Button
          style={{backgroundColor: '#605b56', marginTop: 20}}
          labelStyle={{color: 'white', fontWeight: '600'}}
          onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Already registered? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: Dimensions.get('window').height,
  },
  input: {},
});
