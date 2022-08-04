const bcrypt = require('bcrypt-nodejs')

exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios_perfis', table => {
        table.integer('usuario_id').unsigned()
        table.integer('perfil_id').unsigned()
        table.foreign('usuario_id').references('usuarios.id')
        table.foreign('perfil_id').references('perfis.id')
        table.primary(['usuario_id', 'perfil_id'])
    }).then(function () {
        const salt = bcrypt.genSaltSync()
        return knex('usuarios_perfis').insert([
            { usuario_id: '1',  perfil_id: '1'},
            { usuario_id: '2',  perfil_id: '2'},
            { usuario_id: '3',  perfil_id: '2'},
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios_perfis')
};
