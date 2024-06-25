import { connect } from "../database";

export const putNewClient = async (req, res) => {
    try {
        const connection = await connect();
        const [newClient] = await connection.query(`INSERT INTO clientes (Tipo,
                                                                        NitCC,
                                                                        Nombre,
                                                                        Apellido,
                                                                        Telefono1,
                                                                        Telefono2,
                                                                        Correo,
                                                                        Direccion,
                                                                        Barrio,
                                                                        LimiteDeCredito,
                                                                        Nota,
                                                                        Fecha,
                                                                        IdFerreteria)
                                                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,[req.body.Tipo, req.body.NitCC, req.body.Nombre, req.body.Apellido, req.body.Telefono1, req.body.Telefono2, req.body.Correo, req.body.Direccion, req.body.Barrio, req.body.Fecha, req.body.LimiteDeCredito, req.body.Nota, req.body.Fecha, req.body.IdFerreteria]);
        res.json(newClient);
        connection.end(); }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getClientList = async (req, res) => {
    try {
        const connection = await connect();
        const [clientList] = await connection.query(`SELECT
                                                cli.Consecutivo,
                                                cli.Tipo,
                                                cli.NitCC,
                                                cli.Nombre,
                                                cli.Apellido,
                                                cli.Telefono1,
                                                cli.Telefono2,
                                                cli.Correo,
                                                cli.Direccion,
                                                cli.Barrio,
                                                cli.LimiteDeCredito,
                                                cli.Nota,
                                                Cli.Fecha
                                            FROM
                                                clientes AS cli
                                            WHERE
                                                cli.IdFerreteria = ?`,[req.body.IdFerreteria])
        res.json(clientList);
        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


export const putNewProduct = async (req, res) => {
    const connection = await connect();
    try {
        //Start the transaction
        await connection.beginTransaction();

        //First insertion to the table productos
        const sql1 = `INSERT INTO productos (IdFerreteria,
                                            Cod,
                                            Descripcion,
                                            Clase,
                                            SubCategoria,
                                            Detalle) 
                                    VALUES (?,?,?,?,?,?)`
        const values1 = [req.body.IdFerreteria, req.body.Cod, req.body.Descripcion, req.body.Clase, req.body.SubCategoria, req.body.Detalle]
        await connection.execute(sql1, values1);

        //Second insertion to the table detalleproductoferreteria
        const sql2 = `INSERT INTO detalleproductoferreteria (IdFerreteria,
                                                            PCosto,
                                                            PVenta,
                                                            InvMinimo,
                                                            InvMaximo,
                                                            Ubicacion)
                                        VALUES (?,?,?,?,?,?)`
        const values2 = [req.body.IdFerreteria, req.body.PCosto, req.body.PVenta, req.body.InvMinimo, req.body.InvMaximo, req.body.Ubicacion]
        await connection.execute(sql2, values2);

        // Confirm the transaction
        await connection.commit();
        res.status(200).json({ message: 'Transacción completada con éxito' });
    } catch (error) {
        // In case of error, the transaction is returned
        await connection.rollback();
        console.log(error);
        res.status(500).json(error);
    } finally {
        // Close the connection
        await connection.end();
    }
}