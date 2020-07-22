const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const excel = require('exceljs');
const dateUtil = require('../utils/date');
const table = require('table').table;
const fs = require('fs');

const newsService = require('../services/news');

const cache = require('../config/cache');


const getNewsHeader = (req, res, next) => {
    return newsService.mapNewsContentForClientResponse(req, res, next)
        .then(
            news => {
                res.send({
                    success: true,
                    data: { news }
                })
            }
        )
        .catch(
            err => {
                res.status(400).send({
                    success: false,
                    message: err
                })
            }
        )
};

const getNewsDetail = (req, res, next) => {
    return newsService.mapNewsDetailContent(req, res, next)
        .then(
            news => {
                res.send({
                    success: true,
                    data: { news }
                })
            }
        )
        .catch(
            err => {
                res.status(400).send({
                    success: false,
                    message: err
                })
            }
        )
};

const createNews = async (req, res, next) => {
    return  await newsService.createNews(req, res, next)
            .then(
                news => {
                    res.send({
                        success: true,
                        data: { news }
                    })
                })
            .catch(
                err => {
                    res.status(400).send({
                        success: false,
                        message: 'This news does already exists at database.'
                    })
                }
            )
}

const deleteNews = async (req, res, next) => {
    return await newsService.deleteNews(req, res, next)
            .then(
                news => {
                    res.send({
                        success: true,
                        data: { news }
                    })
                })
            .catch(
                err => {
                    res.status(400).send({
                        success: false,
                        message: err
                    })
                }
            )
}

const editNews = async (req, res, next) => {
    return await newsService.editNews(req, res, next).then(
        news => {
            res.send({
                success: true,
                message: 'Updated.',
                data: { news }
            })
        }
    ).catch(
        err => {
            res.status(400).send({
                success: false,
                message: err
            })
        })
}

const exportNewsToExcel = (req, res, next) => {
    return newsService.mapNewsContent(req, res, next).then(
        news => {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Analise notícias');

            worksheet.columns = [
                {header: 'Código', key: 'id', width: 10},
                {header: 'Título', key: 'titulo', width: 40},
                {header: 'Data', key: 'data', width: 20},
                {header: 'Texto', key: 'texto', width: 200},
                {header: 'Url', key: 'url', width: 30},
                {header: 'Palavra Chave', key: 'palavra_chave', width: 20},
                {header: 'Site', key: 'site', width: 20},
                {header: 'Projeto', key: 'projeto', width: 20}
            ];

            worksheet.addRows(news);

            let fileName = `extracao_noticias_${dateUtil.makeCurrentDateByCorrectTimeZone(new Date)}_.xlsx`;

            // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            // res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

            res.attachment(fileName);

            workbook.xlsx.write(res).then(function(){
                res.end();
            });
        },
        err => {
            res.status(500).send({
                success: false,
                message: `Error with the exportation process: ${err}`
            })
        } 
    )
}


const exportNewsToTxt = (req, res, next) => {
    return newsService.mapNewsContentTabular(req, res, next).then(
        news => {
            let config = {
                columnDefault: {
                    width: 20
                },
                columnCount: 8,
                columns: {
                    0 : { width: 10, alignment: 'left'},
                    1 : { width: 40, alignment: 'center'},
                    2 : { width: 20, alignment: 'left'},
                    3 : { width: 200, alignment: 'left'},
                    4 : { width: 30, alignment: 'left'},
                    5 : { width: 20, alignment: 'left'},
                    6 : { width: 20, alignment: 'left'},
                    7 : { width: 20, alignment: 'left'},
                }
            }

            let output = table(news, config);
            let fileName = `extracao_noticias_${dateUtil.makeCurrentDateByCorrectTimeZone(new Date)}_.txt`;
            
            res.setHeader('Content-type', "application/octet-stream");

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.send(output);
        },
        err => {
            res.status(500).send({
                success: false,
                message: `Error with the exportation process: ${err}`
            })
        }
    )
}


module.exports = {
    getNewsHeader,
    getNewsDetail,
    createNews,
    deleteNews,
    editNews,
    exportNewsToExcel,
    exportNewsToTxt
}
