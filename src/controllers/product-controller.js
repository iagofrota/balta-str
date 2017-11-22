'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationConstracts = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product
        .find({
            active: true
        }, 'title slug price')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description slug price tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description slug price tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    let contract = new ValidationConstracts();
    contract.hasMinLen(req.body.title, 3, 'O título deverá ter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deverá ter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deverá ter no mínimo 3 caracteres');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(200).send({
                message: 'Produto cadastrado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar um produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar um produto',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover um produto',
                data: e
            });
        });
};