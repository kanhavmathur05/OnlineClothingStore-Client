import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:"us-west-2_cXVRnym9l",
    ClientId:"42nb0dpg0r3pvk9lakkkit6e5i"
}

export default new CognitoUserPool(poolData);