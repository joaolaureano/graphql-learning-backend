

exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('senha', 60)
        table.boolean('ativo')
            .notNull().defaultTo(true)
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    }).then(function () {
        const bcrypt = require('bcrypt-nodejs')
        const salt = bcrypt.genSaltSync()
        const pwds = [bcrypt.hashSync("admin", salt), bcrypt.hashSync("joao", salt), bcrypt.hashSync('maria', salt)]
        
        return knex('usuarios').insert([
            { nome: 'admin',    email: 'admin@gmail.com',  senha:pwds[0]},
            { nome: 'João',     email: 'joao@gmail.com',   senha:pwds[1]},
            { nome: 'Maria',    email: 'maria@gmail.com',  senha:pwds[2] },
        ])
    })



};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
