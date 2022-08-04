
exports.up = function(knex, Promise) {
  return knex.schema.createTable('perfis', table => {
      table.increments('id').primary()
      table.string('nome').notNull().unique()
      table.string('rotulo').notNull()
  }).then(function () {
      return knex('perfis').insert([
          { nome: 'administrador', rotulo: 'Administrador' },
          { nome: 'comum', rotulo: 'Comum' },
          { nome: 'master', rotulo: 'Master' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('perfis')
};
