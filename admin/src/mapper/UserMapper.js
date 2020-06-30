
import UserProto from '../api/Actor_pb';

let userMapper = {}

userMapper.toCustomerObject = (customer) => {
    return {
        role: customer.getUserinfo().getRole(),
        username: customer.getUserinfo().getUsername(),
        password: customer.getUserinfo().getPassword(),
        email: customer.getUserinfo().getEmail(),
        version: customer.getUserinfo().getVersion(),
        firstName: customer.getFirstname(),
        lastName: customer.getLastname(),
        phone: customer.getPhone()
    }
}

userMapper.toCustomer = (customerObject) => {
    const customer = new UserProto.Customer();
    const userInfo = new UserProto.User();

    userInfo.setRole(customerObject.role)
    userInfo.setUsername(customerObject.username)
    userInfo.setPassword(customerObject.password)
    userInfo.setEmail(customerObject.email)
    userInfo.setVersion(customerObject.version)

    customer.setUserinfo(userInfo)
    customer.setFirstname(customerObject.firstName)
    customer.setLastname(customerObject.lastName)
    customer.setPhone(customerObject.phone)

    return customer;
}

userMapper.toRoleString = (roleNumber) => {
    switch (roleNumber) {
        case UserProto.UserRole.PARKING_LOT_EMPLOYEE: return "PLE"
        case UserProto.UserRole.GOVERNMENT_EMPLOYEE: return "GOV"
        case UserProto.UserRole.ADMIN: return "ADM"
        case UserProto.UserRole.CUSTOMER: return "CUS"
        default: return "ALL"
    }
}

export default userMapper;