module.exports = (sequelize, DataTypes) => {
    var Project = sequelize.define('projeto', {
        id : {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        name : {
            field: 'nome',
            type: DataTypes.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false
    });

    return Project;
};
