import {sqlDB} from "./config";


const createTable = async (tableName, columns, scsCallback, errCallback) => {
    const columnsStr = columns.slice(1).map(item => item[1] ? item.join(' ') : `${item} VARCHAR(255)`).join(', ')
    await sqlDB.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName}
             (
                 id VARCHAR(255),
                 ${columnsStr}
             )`,
            [],
            (sqlTxn, res) => {
                if (scsCallback) scsCallback(sqlTxn, res)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
}

const insert = async (tableName, keys, values, scsCallback, errCallback) => {
    await sqlDB.transaction(txn => {
        txn.executeSql(
            `INSERT INTO ${tableName} (${keys.map(item => item[0]).sort().join(',')})
             VALUES ${values.map(item => `(${item.join(', ')})`)}`,
            [],
            (sqlTxn, res) => {
                if (scsCallback) scsCallback(sqlTxn, res)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
}

const update = async (tableName, cols, where, scsCallback, errCallback) => {

    await sqlDB.transaction(txn => {
        let colsStr = '';
        for (const key in cols) {
            let value;
            if (!cols[key]) value = 'NULL'
            else value = `'${cols[key]}'`
            colsStr += `${key} = ${value}, `
        }
        txn.executeSql(
            `UPDATE ${tableName}
             SET ${colsStr.slice(0, colsStr.lastIndexOf(', '))}
             WHERE ${where}`,
            [],
            (sqlTxn, res) => {
                if (scsCallback) scsCallback(sqlTxn, res)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
}

const select = (tableName, cols, conditions, scsCallback, errCallback) => {
    sqlDB.transaction(txn => {
        txn.executeSql(
            `SELECT ${Array.isArray(cols) ? cols.join(',') : '*'}
             FROM ${tableName} ${conditions ? `WHERE ${conditions}` : ''}`,
            null,
            (sqlTxn, res) => {
                const resData = res.rows._array.map(item => {
                    return Object.keys(item).reduce((acc, cur) => {
                        if (typeof item[cur] === 'string' && item[cur]?.startsWith(`[`) && item[cur]?.endsWith(`]`)) {
                            acc[cur] = JSON.parse(item[cur])
                        }else if (item[cur] === 'false' || item[cur] === 'true') {
                            if(item[cur] === 'false') acc[cur] = false
                            else acc[cur] = true
                            acc[cur] = JSON.parse(item[cur])
                        } else {
                            acc[cur] = item[cur]
                        }
                        return acc
                    }, {})
                })
                if (scsCallback) scsCallback(resData)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
};

const deleteCol = (tableName, where, scsCallback, errCallback) => {
    sqlDB.transaction(txn => {
        txn.executeSql(
            `DELETE
             FROM ${tableName}${where ? ` WHERE ${where}` : ''}`,
            null,
            (sqlTxn, res) => {
                if (scsCallback) scsCallback(sqlTxn, res)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
}

const deleteDB = (table, scsCallback, errCallback) => {
    sqlDB.transaction(txn => {
        txn.executeSql(
            `DROP TABLE ${table}`,
            [],
            (sqlTxn, res) => {
                if (scsCallback) scsCallback(sqlTxn, res)
            },
            error => {
                if (errCallback) errCallback(error)
            },
        );
    });
}


const sqlQueries = {createTable, insert, select, deleteCol, update, deleteDB}
export default sqlQueries


export const saveDataInLocStore = async (tableName, tableCols, payload, deleteWhere = null, isSavePrev) => {
    if (!isSavePrev) await sqlQueries.deleteCol(tableName, deleteWhere, null, () => console.error('clear err'))
    if (payload.length) {
        const insertValues = await payload
            .map(payloadItem => (
                tableCols
                    .sort()
                    .map(item => item[0])
                    .map(item => {
                        if (Array.isArray(payloadItem[item])) return `'${JSON.stringify(payloadItem[item])}'`
                        else if (typeof payloadItem[item] !== 'boolean' && !payloadItem[item] || payloadItem[item] === []) return `NULL`
                        else return `"${payloadItem[item]}"`
                    })
            ))

        sqlQueries.insert(tableName, tableCols, insertValues, null, (err) => console.error('insert err'))
    }
}
