const email = Math.random().toString(36).substring(2, 15);

export const userDataWithEmptyUserName = {
  email: `${email}@gmail.com`,
  password: '123456789',
  userName: ''
};
// export const userDataWithNoLastName = {
//   email: `${email}@gmail.com`,
//   password: '123456789',
//   userName: '   Augustine  ',
// };
// export const userDataWithThreeNames = {
//   email: `${email}@gmail.com`,
//   password: '123456789',
//   userName: '   Augustine  Emeka Ezinwa',
// };
export const userDataWithLongUserName = {
  email: `${email}@gmail.com`,
  password: '123456789',
  userName: '   dfgsfggsfgffgfdfgdekjfkdfjdjf Emrewwekaerfefjduigyguyfgftfyuftc',
};
export const userDataWithInvalidUserName = {
  email: `${email}@gmail.com`,
  password: 'omotayo123',
  userName: '   Omotayo* Tolu  ',
};
// export const userDataWithNumericName = {
//   email: `${email}@gmail.com`,
//   password: '123456789',
//   userName: '   Omotayo9 Tolu  ',
// };
export const userDataWithInvalidEmail = {
  email: 'thisisAndela@@@anfkfkkf.com',
  password: 'omotayo123',
  userName: 'Omotayo'
};
export const userDataWithInvalidPassword = {
  email: `${email}@gmail.com`,
  password: 'Inieefjinio',
  userName: 'Obije Victor'
};
export const userDataWithShortPassword = {
  email: `${email}@gmail.com`,
  password: 'Inief9e',
  userName: 'Edogbo Sunny'
};
export const userDataWithWhiteSpacedPassword = {
  email: `${email}@gmail.com`,
  password: 'Inief     9e',
  userName: 'Azu Patrick'
};
export const userDataWithEmptyPassword = {
  email: `${email}@gmail.com`,
  password: '',
  userName: 'Jolaoso oluwaseun'
};
export const userDataWithEmptyEmail = {
  email: '',
  password: 'omotayo123',
  userName: 'Abiodun Abudu'
};
export const userDataWithInvalidPasswordAndEmail = {
  email: `${email}@@@gmail.com`,
  password: 'emekadonkey',
  userName: 'Abiodun Abudu'
};
export const userDataWithInvalidFields = {
  email: `${email}@@@gmail.com`,
  password: 'omotayo123',
  userName: 'Odekwu Peter*9'
};
export const userDataWithEmptyFields = {
  email: '',
  password: '',
  userName: '',
};
export const userDataWithAnExistingEmail = {
  email: 'ottimothy@andela.com',
  password: 'omotayo123',
  userName: 'Omotayo ',
};
export const userDataWithInvalidDataTypes = {
  email: true,
  password: false,
  userName: true,
  bio: true,
  avataUrl: true
};

