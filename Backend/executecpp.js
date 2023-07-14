const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const outputpath = path.join(__dirname , 'outputs');

if(!fs.existsSync(outputpath))
{
    fs.mkdirSync(outputpath , {recursive : true});
}

const executecpp = (filepath) => {
    const job_id = path.basename(filepath).split(".")[0];
    const outpath = path.join(outputpath , `${job_id}.exe`);

    return new Promise((resolve , reject) =>{
        exec(
            `g++ "${filepath}" -o "${outpath}" && cd "${outputpath}" && .\\${job_id}.exe` , 
            (error , stdout , stderr) => {
                if(error){
                    reject({error , stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
    })


}

module.exports = {
    executecpp,
}