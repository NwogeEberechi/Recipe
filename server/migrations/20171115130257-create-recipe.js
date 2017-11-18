module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      direction: {
        type: Sequelize.STRING
      },
      viewcount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Recipes'),
};