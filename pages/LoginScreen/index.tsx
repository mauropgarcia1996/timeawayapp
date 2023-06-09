import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Snackbar, Text} from 'react-native-paper';
import {supabase} from '../../api/supabaseConfig';
import CustomInput from '../../components/common/CustomInput';
import {useAuthStore} from '../../store/authStore';
const LoginScreen = ({navigation}) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {setSession} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string | null | undefined>(
    null,
  );
  const onSubmit = async userData => {
    setLoading(true);
    try {
      let {data, error} = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (!error) {
        setSession(data.session);
      }
      setSnackMessage(error?.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height,
      }}>
      <View>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          Login
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              disabled={loading}
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
              disabled={loading}
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
        <Button
          style={{backgroundColor: '#acc18a', marginTop: 20}}
          labelStyle={{color: 'white', fontWeight: '600'}}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={loading}>
          {loading ? 'Loading' : 'Login'}
        </Button>
        <Button
          style={{backgroundColor: '#605b56', marginTop: 20}}
          labelStyle={{color: 'white', fontWeight: '600'}}
          onPress={() =>
            onSubmit({email: 'test@test.com', password: 'test123'})
          }
          disabled={loading}
          loading={loading}>
          {loading ? 'Loading' : 'Login as Guest'}
        </Button>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Not registered? </Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text>Sign In</Text>
          </Pressable>
        </View>
      </View>
      <Snackbar
        visible={Boolean(snackMessage)}
        onDismiss={() => setSnackMessage(null)}
        onIconPress={() => setSnackMessage(null)}>
        {snackMessage}
      </Snackbar>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  input: {},
});
