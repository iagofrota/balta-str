'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationConstracts = require('../validators/fluent-validator');
const respository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {

    try {
        const data = await respository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao fazer a requisição de get'
        });
    }
}

exports.getBySlug = async (req, res, next) => {
    const data = await respository.getBySlug(req.params.slug);
    res.status(200).send(data);
}

exports.getById = async (req, res, next) => {
    try {
        const data = await respository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao executar a requisição'
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await respository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha na requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationConstracts();
    contract.hasMinLen(req.body.title, 3, 'O título deverá ter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deverá ter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deverá ter no mínimo 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await respository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Problema na requisição de cadastro'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await respository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto editado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Problema na requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await respository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto deletedo com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Problema na requisição'
        });
    }
}