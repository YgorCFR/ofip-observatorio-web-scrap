module.exports = (sequelize, DataTypes) => {
    const KeyWord = sequelize.define('palavra_chave', {
        id: {
            primaryKey: true, 
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        value : {
            field: 'valor',
            type: DataTypes.STRING,
        },
        project : {
            field: 'projeto',
            type: DataTypes.BIGINT
        }
    });

    return KeyWord;
};