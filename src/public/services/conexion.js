import pg from 'pg';
const { Client } = pg;
import bcrypt from 'bcryptjs';

const config = {
    user: 'bd_vortix_user',
    password: '1xPi6CRMuEk9Yc4DJYcxjyw79ysjgChz',
    database: 'bd_vortix',
    host: 'dpg-d10dkh49c44c73djt460-a.oregon-postgres.render.com',
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

export async function conectar() {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        console.log('Conexión exitosa a la base de datos');
        return cliente;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        await cliente.end(); // Cerrar conexión en caso de error
        throw error;
    }
}

export async function ConsultarProductos() {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        console.log('Executing query: SELECT * FROM productos');
        const resultado = await cliente.query('SELECT * FROM productos');
        console.log('Productos consultados:', resultado.rows);
        return resultado.rows;
    } catch (error) {
        console.error('Error al consultar productos:', error);
        throw error; 
    } finally {
        await cliente.end();
    }
}export async function RegistrarCliente(username, password, email) {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const verificarQuery = 'SELECT * FROM cliente WHERE username = $1 OR email = $2';
        const verificarValues = [username, email];
        const verificarResultado = await cliente.query(verificarQuery, verificarValues);
        if (verificarResultado.rows.length > 0) {
            throw new Error('El nombre de usuario o el correo electrónico ya están en uso');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = `INSERT INTO cliente (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email`;
        const insertarValues = [username, hashedPassword, email];
        const resultado = await cliente.query(insertQuery, insertarValues);

        return {
            success: true, // Fixed typo
            message: 'Cliente registrado exitosamente',
            user: resultado.rows[0]
        };
    } catch (error) {
        console.error('Error al registrar cliente:', error);
        return {
            success: false,
            message: error.message || 'Error al registrar cliente'
        };
    } finally {
        await cliente.end();
    }
}
export async function LoginCliente(username, password) {
    const cliente = new Client(config);
    try {
        await cliente.connect();

        // Buscar al usuario por nombre de usuario
        const query = 'SELECT * FROM cliente WHERE username = $1';
        const valores = [username];
        const resultado = await cliente.query(query, valores);

        if (resultado.rows.length === 0) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        const usuario = resultado.rows[0];

        // Comparar la contraseña proporcionada con la almacenada
        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email
            }
        };
    } catch (error) {
        console.error('Error en la función LoginCliente:', error);
        return {
            success: false,
            message: 'Error en el servidor'
        };
    } finally {
        await cliente.end();
    }
}