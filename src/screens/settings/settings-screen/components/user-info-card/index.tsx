import React from 'react';
import {View, Text} from 'react-native';
import {UserType} from '../../../../../types/user';

interface Props {
  user?: UserType;
}

const UserInfoCard = ({user}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center',
        }}>
        User Information
      </Text>
      <View>
        <Text>ID: {user?.id}</Text>
        <Text>Incharge ID: {user?.incharge_id || 'N/A'}</Text>
        <Text>
          Name: {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
        </Text>
        <Text>Department ID: {user?.department_id}</Text>
        <Text>Privilege: {user?.privilege}</Text>
        <Text>Designation: {user?.designation}</Text>
        <Text>Username: {user?.username}</Text>
        <Text>Email: {user?.email}</Text>
        {user?.password && <Text>Password: {user?.password}</Text>}
        <Text>Account Status: {user?.account_status}</Text>
        <Text>User Role: {user?.user_role}</Text>
      </View>
    </View>
  );
};

export default UserInfoCard;
