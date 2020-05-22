module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('permissao', {
        id : {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: {
            type: DataTypes.BIGINT,
            field: 'perfil'
        },
        routeId: {
            type: DataTypes.BIGINT,
            field: 'rota'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Permission;
};