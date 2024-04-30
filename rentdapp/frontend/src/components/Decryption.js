//房客 解密頁面
import {React, useState} from 'react'
import "./Decryption.css"
import CryptoJS from "crypto-js"
import copy from "copy-to-clipboard";

import {AiFillEye} from 'react-icons/ai'
import {BsFillEyeSlashFill} from 'react-icons/bs'

function Decryption () {

  const [password, setPassword] = useState("") //密碼
  const [ciphertext, setCiphertext] = useState("") //加密後的契約網址
  async function getCiphertext(e) {
    setCiphertext(e.target.value)
  }
  
  //契約網址解密
  async function decrypt(event) {
    event.preventDefault()
    setCiphertext(event.target.value)
    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), password);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return setFileUrl(plaintext)
  }

  const [fileUrl, setFileUrl] = useState("")
  const handleCopyText = (e) => {
    setFileUrl(e.target.value);
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
      <div style={{ backgroundImage: "url(/bg6.png)",backgroundSize:"contain",backgroundRepeat:"repeat" }}>
       <>
       
        <br/>
        
        <div className="decryptiontitle" id='decryptiontitle'>契約網址解密</div>

        <form className="box" id="decryptionbox">
          <div className="field">
            <label className="label" id="decryptionlabel">網址密文:</label>
            <div className="control">
              <input id="ciphertext" className="input is-warning" type="text" onChange={getCiphertext} autocomplete="off"/>
            </div>
          </div>

          <div className="field">
            <label className="label" id="decryptionlabel">密碼:</label>
            <div className="control">
            <p class="control has-icons-left has-icons-right">
              <input id="decryptionpassword" className="input is-warning" type={type} onChange={(event) => setPassword(event.target.value)}/>
              <i id="decryptioneye" onClick={handleToggle}>{icon}</i>
              <span id="decryptionlock" className="icon is-left">
              <i className="fas fa-lock"></i>
              </span>
            </p>
            </div>
          </div>

          <button id="decryptionbutton" className="button is-warning" onClick={decrypt}>解密</button>
        </form>

          <div className="box" id="ipfsurlbox">
            <div className="field" id="ipfsurlfield">
                <label className="label" id="ipfsurllabel">契約網址:</label>
                <div className="control">
                    <input id="ipfsurlinput" className="input is-warning" type="text" value={fileUrl} onChange={handleCopyText} autocomplete="off"/> 
                </div>
            </div>

            <div className="uploadbutton">
                <button id="ipfsurlcopybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
            </div>
        </div>
        
       </> 
       </div>
    )
}
export default Decryption



