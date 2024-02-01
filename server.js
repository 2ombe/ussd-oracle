const express = require('express')
const oracledb = require('oracledb')

const app =express()
const port =3000

const configdb = {
    user: 'system',
    password: '1234',
    connectString: 'localhost:1521/XEPDB1'
};


app.get('/',async(req,res)=>{
    try {
        const connection = await oracledb.getConnection(configdb)
        console.log(connection)
        // execute the query
        const result = await connection.execute('SELECT * FROM ussd_oracle')
        res.json(result.rows)
        await  connection.close()
    } catch (error) {
       console.error(error);
       res.status(500).send("failled to connect") 
    }
})

app.listen(port,()=>{
    console.log(`Server connected to port ${port}`)
})