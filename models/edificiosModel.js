const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "palosanto",
    database: "genovasrl",
    connectionLimit: 5
});

const getEdificios = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, nombre_edificio, direccion_edificio, email_contacto FROM edificios"
        );

        return rows;
    } catch (error) {
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const getEdificiosById = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, nombre_edificio, direccion_edificio, email_contacto FROM edificios WHERE id=?",
            [id]
        );

        return rows[0];
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const createEdificio = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            `INSERT INTO edificios(nombre_edificio, direccion_edificio, email_contacto) VALUE(?, ?, ?)`,
            [user.nombre_edificio, user.direccion_edificio, user.email_contacto]
        );

        return { id: parseInt(response.insertId), ...user };
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const updateEdificio = async (id, user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            `UPDATE edificios SET nombre_edificio=?, direccion_edificio=?, email_contacto=? WHERE id=?`,
            [user.nombre_edificio, user.direccion_edificio, user.email_contacto, user.id]
        );

        return { id, ...user };
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const deleteEdificioById = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("DELETE FROM edificios WHERE id=?", [id]);

        return true;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
    return false;
}

module.exports = {
    getEdificios,
    getEdificiosById,
    createEdificio,
    updateEdificio,
    deleteEdificioById,
};