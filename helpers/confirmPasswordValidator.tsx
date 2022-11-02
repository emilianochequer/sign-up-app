
export const confirmPasswordValidator = (confirmPassword: any, form: any) => {
    if (!confirmPassword) {
        return false;
    } else if (confirmPassword.length < 8) {
        return false;
    } else if (confirmPassword !== form.password) {
        return false;
    }
    return true;
};
