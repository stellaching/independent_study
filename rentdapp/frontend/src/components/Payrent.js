//房客 支付頁面 

import React, {useState} from "react";
import "./Payrent.css"
import { ethers } from "ethers";
import { useAuth0 } from '@auth0/auth0-react'
import { getDatabase, ref, child, get,set, query, equalTo, push,orderByValue, update } from "firebase/database";
import {FaSearch} from 'react-icons/fa'

//複製按鈕套件
import copy from "copy-to-clipboard";

function Payrent () {
    const [index, setIndex] = useState(0)       //tab標籤
    const [amount, setAmount] = useState('')    //要發送的ETH數量
    const [hash, setHash] = useState('')        //這筆交易的Hash
    const [message, setMessage] = useState('')  //備註
    const [func,setF] = useState('')
    const [rth,setRth] = useState('')
    const [contract, setContract] = useState('') 

    //setContract('0xf4038882Be4f8f7D67eF1A4202C9CbfF7A54f399');
    //檢查租約的合約位置
    const {user} = useAuth0(); 
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    let uname=user.sub;
    get(child(dbRef,'user/'+uname)).then((snapshot) => {
      if(snapshot.val().rent!==""){
        console.log("has rent");
        setContract(snapshot.val().rent);
        setRth(snapshot.val().owner);
      }else{setContract('0xf4038882Be4f8f7D67eF1A4202C9CbfF7A54f399');}
    });

    async function pay(con) {
        //連接使用者帳號
        await window.ethereum.send("eth_requestAccounts"); 

        //連接Metamask錢包
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        
        //和合約做互動
        const signer = provider.getSigner(); 
        const ContractAddress = con;
        const ContractABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Deposit",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "payDeposit",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "payRent",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "returnDeposit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "r",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "rc",
                        "type": "string"
                    }
                ],
                "name": "setData",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "sc",
                        "type": "string"
                    }
                ],
                "name": "signcontractO",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "sc",
                        "type": "string"
                    }
                ],
                "name": "signcontractT",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Withdraw",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getData",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getDataForO",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getDataForT",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "ownerAddr",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rdeposit",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rent",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tenantAddr",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        let transaction;
            if(con==='0xf4038882Be4f8f7D67eF1A4202C9CbfF7A54f399'){alert("您還沒有租約");}
            else if(func === 'rent'){
                transaction = await contract.payRent({ value:amount});
                setHash(transaction.hash)}
            else if(func==='desp') {
                transaction = await contract.payDeposit({ value:amount});
                setHash(transaction.hash)}
            else if(func==='checkd'){
                let mes = await contract.getData();
                mes = mes.toString();
                let dn=mes.indexOf('contract');
                var cont=mes.substring(dn+10);
                setMessage(cont);
            }
    }

    async function rent(event){
        event.preventDefault()
        setF('rent');
        await pay(contract)
    }

    async function desp(event){
        event.preventDefault()
        setF('desp');
        await pay(contract)
    }

    async function checkd(event){
        event.preventDefault()
        setF('checkd');
        await pay(contract)
    }
    
    const copyToClipboard = () => {
        copy(hash);
        alert(`交易Hash複製成功~ "${hash}"`);
    }
    
    const copyToClipboarda = () => {
        copy(message);
        alert(`已複製契約地址 `);
    }

    async function rtrt(event){
        event.preventDefault()
        if(contract==='0xf4038882Be4f8f7D67eF1A4202C9CbfF7A54f399'){alert("您還沒有租屋")}
        else{
            update(ref(db,'renthouse/'+rth+'/'+contract),{stat:"空"})
            update(ref(db,'user/'+uname),{owner:""})
            update(ref(db,'user/'+uname),{rent:""})
            alert("已退租");
        }
        
    }
    
    return (
       <div style={{ backgroundColor:"#FFF3B8",backgroundImage: "url(/bg5.png)"}}>
       <>
       
       <div className="tab" id="tab">
            <div className="tablist" id="tablist">
                <div className={`tabheadleft ${index===0?'active':null}`} onClick={ ()=>{setIndex(0)} }>
                    &nbsp;契約地址&nbsp;
                </div>
                <div className={`tabheadmiddle ${index===1?'active':null}`} onClick={ ()=>{setIndex(1)} }>
                    &nbsp;&nbsp;付押金&nbsp;&nbsp;
                </div>
                <div className={`tabheadright ${index===2?'active':null}`} onClick={ ()=>{setIndex(2)} }>
                    &nbsp;&nbsp;付房租&nbsp;&nbsp;
                </div>
            </div>
        </div>
       
        <div className="tabcontent" hidden={index !== 0}>
            <form className="box" id="tenantsearchbox">
                <div className="cdata">
                    <div class="control has-icons-left">
                        <button id="tenantsearchbutton" onClick={checkd} className="button is-warning">&nbsp;&nbsp;&nbsp;查詢</button>
                        
                        <span className="icon is-small is-left" id="tenantsearchicon">
                            <FaSearch size={50} color="#000046"/>
                        </span>
                    </div>
                </div>

                <div className="control">
                    <input id="tenantsearchinput" value={message} className="input is-warning" type="text" autocomplete="off"/>
                </div>
                <div className="paymentbutton">
                    <button id="copybutton" onClick={copyToClipboarda} className="button is-warning">複製</button>
                </div>
                <br/><></>
                <br/><></>
                <br/><></>
            </form>
        </div>
       
        <div className="tabcontent"  hidden={index !== 1}>
            <form className="box" id="paydepositbox">
                <div className="field">
                    <label className="label" id="paydepositlabel">押金:</label>
                    <div class="control has-icons-left">
                        <div className="control">
                            <input id="paymentinput" value={amount} onChange={(event) => setAmount(event.target.value)} className="input is-warning" type="text" autocomplete="off"/>
                        </div>
                        <span className="icon is-left" id="paydepositinputicon">
                            <img src="ethereum.png" alt="quit"/>
                        </span>
                    </div>
                </div>

                <div class="control has-icons-left">
                    <button id="paydepositbutton" onClick={desp} className="button is-warning">&nbsp;&nbsp;&nbsp;支付</button>
                    <span className="icon is-left" id="paydepositicon">
                        <img src="ether.png" alt="quit"/>
                    </span>
                </div>
            </form>

            <div className="box" id="paymenthashbox">
                <div className="field">
                    <label className="label" id="paymenthashlabel">交易Hash:</label>
                    <div className="control">
                        <input id="paymentinput" value={hash} className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                </div>

                <div className="paymentbutton">
                    <button id="copybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
                </div>
            </div>
        </div>
       
        <div className="tabcontent"  hidden={index !== 2}>
            <form className="box" id="paydepositbox">
                <div className="field">
                    <label className="label" id="paydepositlabel">租金:</label>
                    <div class="control has-icons-left">
                        <div className="control">
                            <input id="paymentinput" value={amount} onChange={(event) => setAmount(event.target.value)} className="input is-warning" type="text" autocomplete="off"/>
                        </div>
                        <span className="icon is-left" id="paydepositinputicon">
                            <img src="ethereum.png" alt="quit"/>
                        </span>
                    </div>
                </div>

                <div class="control has-icons-left">
                    <button id="paydepositbutton" onClick={rent} className="button is-warning">&nbsp;&nbsp;&nbsp;支付</button>
                    <span className="icon is-left" id="paydepositicon">
                        <img src="ether.png" alt="quit"/>
                    </span>
                </div>
            </form>

            <div className="box" id="paymenthashbox">
                <div className="field">
                    <label className="label" id="paymenthashlabel">交易Hash:</label>
                    <div className="control">
                        <input id="paymentinput" value={hash} className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                </div>

                <div className="paymentbutton">
                    <button id="copybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
                </div>
            </div>
        </div>
        
       </> 
       </div>
    )
}
export default Payrent