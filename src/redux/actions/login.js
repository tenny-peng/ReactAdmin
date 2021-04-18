import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types'

export const saveUserInfo = data => {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return { type: SAVE_USER_INFO, data };
}

export const deleteUserInfo = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return { type: DELETE_USER_INFO };
}
