import db from '../../database/models';
const { Users } = db;

const createUser = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();

  try {
    let result = await Users.create(data, { transaction: t });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createUser', error);
    throw new Error(error);
  }
};

export { createUser };
