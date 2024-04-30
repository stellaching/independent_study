//房東 上傳頁面
import {React, useState} from "react";
import './Upload.css'

//icon 套件
import {RiFileLockLine} from 'react-icons/ri'
import {AiFillEye} from 'react-icons/ai'
/*import {BsEyeSlashFill} from 'react-icons/bs'*/
import {BsApp, BsFillEyeSlashFill} from 'react-icons/bs'
//複製按鈕套件
import copy from "copy-to-clipboard";
import { Buffer } from "buffer";

const ipfsClient = require('ipfs-http-client');

const projectId = '2DzmHf0XX7OnelfcT20OU5A4Y2g';
const projectSecret = '65952ef6974fb9b79ab1fe1f6fe33885';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

function Upload () {
    
    //用來加密網址的密碼
    const [password, setPassword] = useState("") 
    
    /*加密契約網址*/
    var CryptoJS = require("crypto-js");

    const encrypt = (text) => {
        var ciphertext = CryptoJS.AES.encrypt(text, password);
        return ciphertext.toString()
    }
    
    const [fileUrl, updateFileUrl] = useState(``)
    const [file, setFile] = useState()
    async function choosefile(e) {
        setFile(e.target.files[0])
    }
    
    async function uploadtoipfs(event){
        try {
            const added = await client.add(file)
            const url = `https://renthouse25.infura-ipfs.io/ipfs/${added.path}`

            updateFileUrl(encrypt(url))
            } catch (error) {
            console.log('Error uploading file: ', error)
            }  
            
        event.preventDefault()
        //await choosefile()
        
    }
    
        const handleCopyText = (e) => {
           updateFileUrl(e.target.value);
        } 
        
        const copyToClipboard = () => {

           copy(fileUrl);
           alert(`複製成功~ "${fileUrl}"`);
        }
        
        //密碼顯示或不顯示
        const Eye = <AiFillEye size={30}/>;
        const Eyeoff = <BsFillEyeSlashFill size={30}/>;
        const [type, setType] = useState('password')
        const [icon, setIcon] = useState(Eyeoff)
        const handleToggle = () => {
            if(type==='password') {
                setIcon(Eye)
                setType('text')
            }
            else {
                setIcon(Eyeoff)
                setType('password')
            }
        }

    return (
        <div style={{ backgroundImage: "url(/bg5.png)" }}>
       <>

        <div className="box" id="boxupload">
            <div className="ptitle">
                <p>上傳租屋契約</p>
            </div>

            <div className="field" >
                <p class="control has-icons-left has-icons-right">
                    <input id="passwordinput" className="input is-warning" type={type} placeholder="密碼" onChange={(event) => setPassword(event.target.value)}/>
                    <i id="eye" onClick={handleToggle}>{icon}</i>
                    <span id="lock" className="icon is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>

            <div id="choose" className="file is-large is-boxed has-name is-centered is-warning">
                <label className="file-label">
                    <input onChange={choosefile} className="file-input" type="file" name="resume"/>
                    <span className="file-cta">
                        <RiFileLockLine size={40}/>
                        <span className="file-label">
                        選擇檔案...
                        </span>
                    </span>
                </label>
            </div>
    
            <br/><br/>
            <div>
                <button id="uploadbutton" onClick={uploadtoipfs} className="button is-warning">上傳</button>
            </div>
        </div>
        
        <br/>
        <div className="box" id="boxfileurl">
            <div className="field" id="fileurlfield">
                <label className="label" id="fileurllabel">契約網址密文:</label>
                <div className="control">
                    <input id="fileurlinput" value={fileUrl}  onChange={handleCopyText}  className="input is-warning" type="text" autocomplete="off"/> 
                </div>
            </div>

            <div className="uploadbutton">
                <button id="copybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
            </div>
        </div>
        <br/>
       </>
       </div>
    )
}
export default Upload
