'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationConstracts = require('../validators/fluent-validator');
const respository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    respository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    respository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req, res, next) => {
    respository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    respository
        .getByTag(req.params.tag)
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

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    respository
        .create(req.body)
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
    respository
        .update(req.params.id, req.body)
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
    respository
        .delete(req.body.id)
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