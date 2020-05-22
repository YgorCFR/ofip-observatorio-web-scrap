module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('veiculo',{
        id : {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        site: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

    return Vehicle;
};