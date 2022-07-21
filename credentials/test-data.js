// eslint-disable-next-line import/no-extraneous-dependencies
const { generate } = require('randomstring');
const faker = require('faker');

class TestData {
  static textGenerator() {
    return generate({ length: 8, charset: 'alphabetic' });
  }

  static validPhoneNumber() {
    return `+100${generate({ length: 7, charset: 'numeric' })}`;
  }

  static invalidPhoneNumber() {
    return '1888888888';
  }

  static incompletePhoneNumber() {
    return '+188888888';
  }

  static userDomain() {
    return '@test.com';
  }

  static userLogin() {
    return this.textGenerator();
  }

  static validPassword() {
    return this.textGenerator().toUpperCase();
  }

  static newValidPassword() {
    return this.textGenerator().toUpperCase();
  }

  static invalidPassword() {
    return '!Inv';
  }

  static newUserEmail() {
    return `TEST${this.userLogin()}${this.userDomain()}`;
  }

  static firstName() {
    return faker.name.firstName();
  }

  static lastName() {
    return faker.name.lastName();
  }

  static cityName() {
    return faker.address.cityName();
  }

  static streetAddress() {
    return faker.address.streetAddress();
  }

  static stateAbbr() {
    return faker.address.stateAbbr();
  }

  static zipCode() {
    return faker.address.zipCode('#####');
  }

  static qaTestEmail() {
    return 'testy@testy.com';
  }

  static qaTestPassword() {
    return 'zzzzzzzzz';
  }
}
module.exports = {
  userDomain: TestData.userDomain(),
  userLogin: TestData.userLogin(),
  invalidPassword: TestData.invalidPassword(),
  validPassword: TestData.validPassword(),
  newValidPassword: TestData.newValidPassword(),
  invalidPhoneNumber: TestData.invalidPhoneNumber(),
  validPhoneNumber: TestData.validPhoneNumber(),
  incompletePhoneNumber: TestData.incompletePhoneNumber(),
  newUserEmail: TestData.newUserEmail(),
  qaTestEmail: TestData.qaTestEmail(),
  qaTestPassword: TestData.qaTestPassword(),
  firstName: TestData.firstName(),
  lastName: TestData.lastName(),
  cityName: TestData.cityName(),
  streetAddress: TestData.streetAddress(),
  stateAbbr: TestData.stateAbbr(),
  zipCode: TestData.zipCode()

};
