module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('perfil', {
        id : {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'nome'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Profile;
};