module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define('rota', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            field: 'nome',
            type: DataTypes.STRING
        },
        route: {
            field: 'rota',
            type: DataTypes.STRING
        },
        method: {
            field: 'metodo',
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Route;
};