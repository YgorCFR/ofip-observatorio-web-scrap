module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('noticia',{
        id : {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        title : {
            field: 'titulo',
            type: DataTypes.STRING
        },
        text : {
            field: 'texto',
            type: DataTypes.TEXT
        },
        sourceId : {
            field: 'fonte',
            type: DataTypes.BIGINT
        },
        date : {
            field: 'data',
            type: DataTypes.DATE
        }
    });

    return News;
};