import db from '../../database/models';
const { Users } = db;

// Find one user by id
const findUserById = async (id) => {
  try {
    let result = await Users.findByPk(id, { raw: true });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findUserById', error);
    throw new Error(error);
  }
};

// Find One User By Filter
const findOneUser = async (filter) => {
  try {
    let result = await Users.findOne({ ...filter, raw: true });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneUser', error);
    throw new Error(error);
  }
};

// Update User
const updateUser = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Users.update(data, { ...filter, transaction: t });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateUser', error);
    throw new Error(error);
  }
};

export { findUserById, findOneUser, updateUser };
