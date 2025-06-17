import pg from 'pg';
const { Client } = pg;

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
}