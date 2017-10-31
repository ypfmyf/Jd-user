/**
 * Created by Web on 2017/6/1.
 */
module.exports={
    reqister:(req,res)=>{
        var uid = req.query.uid;
        pool.getConnection((err, conn)=>{
            conn.query('SELECT COUNT(*) AS c FROM lottery WHERE uid=?',[uid], (err, result)=>{
                var data = {uid:uid, total: 10, used:result[0].c};
                res.json(data);
                conn.release();
            });
        });
    } ,
    log:(req,res)=>{
        req.on('data',(buf)=>{
            var obj = qs.parse(buf.toString());
            pool.getConnection((err, conn)=>{
                conn.query('INSERT INTO lottery VALUES(NULL,?,?,?)',[obj.uid, obj.level, new Date().getTime()], (err, result)=>{
                    conn.query('SELECT COUNT(*) AS c FROM lottery WHERE uid=?',[obj.uid],(err, result)=>{
                        var data = {uid: obj.uid, total:10, used:result[0].c};
                        res.json(data);
                        conn.release();
                    })
                })
            })
        })
    }
};