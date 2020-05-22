module.exports = (sequelize, DataTypes) => {
    const Source = sequelize.define('fonte',{
        id : {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        url: {
            field: 'fonte',
            type: DataTypes.STRING
        },
        vehicleId : {
            field: 'veiculo',
            type: DataTypes.BIGINT
        },
        keyWordId : {
            field : 'palavra_chave',
            type: DataTypes.BIGINT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Source;
};