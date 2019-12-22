'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        CREATE OR REPLACE function animals_delete_trigger() returns trigger as $$
          declare
              current_animal "RemovedAnimal"%rowtype;
          begin
              if OLD is not null then
                  for current_animal in SELECT * FROM "RemovedAnimal" loop
                      if OLD.name = current_animal.name then
                        UPDATE "RemovedAnimal" SET count = (current_animal.count+1) WHERE name = OLD.name;
                        return OLD;
                      end if;
                  end loop;
                  INSERT INTO "RemovedAnimal" (name, count) VALUES (OLD.name, 1);
                  return OLD;
              end if;
              return null;
          end;
        $$ language plpgsql;
        
        CREATE trigger animals_delete BEFORE DELETE on "Animal" for each row EXECUTE procedure animals_delete_trigger();`)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP trigger animals_delete on "Animal";`)
    }
};
