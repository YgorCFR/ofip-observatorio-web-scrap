module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('usuario', {
        id : {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        cpf: {
            type: DataTypes.STRING
        },
        password: {
            field: 'senha',
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        name: {
            field: 'nome',
            type: DataTypes.STRING
        },
        profileId : {
            field: 'perfil',
            type: DataTypes.BIGINT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return User;
};



