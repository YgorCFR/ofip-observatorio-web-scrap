module.exports = (sequelize, DataTypes) => {
    const UserProject = sequelize.define('usuario_projeto', {
        id : {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        userId : {
            field: 'id_usuario',
            type: DataTypes.BIGINT
        },
        projectId : {
            field: 'id_projeto',
            type: DataTypes.BIGINT
        }
    },
    {
        freezeTableName: true
    });

    return UserProject;
};