import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface : QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        fullName: 'Samuel Morais',
        phone: '38988449448',
        email: 'admin@admin.com',
        password: 'S@muel123',
      },
      {
        fullName: 'Pedro Henrique',
        phone: '399882283847',
        email: 'admin@admin.com',
        password: 'pedro123',
      }
    ])
  },
  down : async (queryInterface : QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
}