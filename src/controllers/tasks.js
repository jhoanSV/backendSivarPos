import { connect, connectDBSivarPos } from "../database";

export const putNewClient = async (req, res) => {
    try {
        const connection = await connectDBSivarPos();
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
        const connection = await connectDBSivarPos();
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
        res.status(200).json({ message: 'Consulta completada con éxito' });
        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


export const putNewProduct = async (req, res) => {
    const connection = await connectDBSivarPos();
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

export const getProductList = async (req, res) => {
    try {
        const connection = await connectDBSivarPos();
        const [productList] = await connection.query(`SELECT
                                                        pro.Consecutivo,
                                                        pro.Cod,
                                                        pro.Descripcion,
                                                        pro.Clase,
                                                        ca.Categoria,
                                                        subca.SubCategoria,
                                                        pro.detalle,
                                                    FROM
                                                        productos AS pro
                                                        JOIN detalleproductoferreteria AS dpro ON pro.Consecutivo = dpro.Consecutivo
                                                        JOIN subcategorias AS subca ON pro.SubCategoria = subca.IdSubCategoria
                                                        JOIN categorias AS ca ON subca.IdCategoria = ca.IdCategoria
                                                    WHERE
                                                        pro.IdFerreteria = '' OR pro.IdFerreteria = ? `, [req.body.IdFerreteria])
        res.status(200).json({ message: 'Consulta completada con éxito' });
        res.json(productList);
        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getInventory = async (req, res) => {
    try {
        const connection = await connectDBSivarPos();
        const [InventoryList] = await connection.query(`SELECT
                                                            pro.Cod,
                                                            pro.Descripcion,
                                                            det.PCosto,
                                                            det.PVenta,
                                                            SUM(en.Cantidad)-IFNULL(SUM(sa.Cantidad),0) AS Inventario,
                                                            det.InvMinimo,
                                                            det.InvMaximo
                                                        FROM
                                                            productos AS pro
                                                        JOIN
                                                            detalleproductoferreteria AS det ON pro.Consecutivo = det.Consecutivo
                                                        RIGHT JOIN
                                                            entradas AS en ON pro.Consecutivo = en.Consecutivo
                                                        LEFT JOIN
                                                            salidas AS sa ON pro.Consecutivo = sa.Consecutivo
                                                        WHERE
                                                            en.IdFerreteria = ? AND
                                                            sa.Consecutivo IS NOT NULL
                                                        GROUP BY 
                                                            pro.Consecutivo`,[req.body.IdFerreteria])
        res.status(200).json({ message: 'Consulta completada con éxito' });
        res.json(InventoryList);
        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getPurchaseList = async (req, res) => {
    try {
        const connection = await connectDBSivarPos();
        const [purchaseList] = await connection.query(`SELECT
                                                            cc.ConInterno,
                                                            cc.NPreFactura,
                                                            cc.Estado,
                                                            cc.Fecha,
                                                            SUM(cpi.Cantidad * cpi.VrUnitarioFactura)
                                                        FROM
                                                            cabeceracompras AS cc
                                                        INNER JOIN
                                                            comprasporingresar AS cpi ON cc.NPreFactura = cpi.NPrefactura
                                                        WHERE
                                                            cc.IdFerreteria = ?
                                                        GROUP BY
                                                            cc.NPreFactura
                                                        ORDER DESC`, [req.body.IdFerreteria]);
        res.status(200).json({ message: 'Consulta completada con éxito' });
        res.json(purchaseList);
        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}