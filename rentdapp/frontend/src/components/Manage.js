//房東 管理頁面
import React, {useState,useEffect} from "react";
import Select from 'react-select'
import "./Manage.css"
import { ethers } from "ethers";
import { useAuth0 } from '@auth0/auth0-react'
import { getDatabase, ref, onValue, get,set, query, equalTo, push,orderByValue,forEach as fe} from "firebase/database";
import {FaHouseUser} from 'react-icons/fa'
//複製按鈕套件
import copy from "copy-to-clipboard";

function Manage () {
    const [index, setIndex] = useState(0)       //tab標籤
    const [amount, setAmount] = useState('')    //要發送的ETH數量
    const [hash, setHash] = useState('')        //這筆交易的Hash
    const [rent, setRent] = useState('')  
    const [ipfsurl, setIpfsurl] = useState('')  //契約ipfs網址
    const [func,setF] = useState('')
    const [contract, setContract] = useState('') 
    const {user} = useAuth0(); 
    const db= getDatabase();
    const [rentlist,setRentl] =useState([]);
    let uname=user.sub;
    //取已有合約的地址加進列表
    onValue(ref(db,'renthouse/'),(snapshot) => {
        var tt=[];
        snapshot.forEach((item)=>{
            onValue(ref(db,'renthouse/'+item.key),(snapshots) => {
                if(item.key===uname){
                    snapshots.forEach((items)=>{
                    let newr={value:items.key,label:items.val().name};
                    tt.push(newr);
                    //console.log(items.val());
                    });
                }
            });
        });
        setRentl(tt);
        
    }
    ,{onlyOnce:true}
    );
    const options =rentlist;
    
    const handleSelected = (e) => {
        console.log(e.value);
        setContract(e.value);
        console.log(contract);
    }
        

    async function pay(con) {
        //連接使用者帳號
        await window.ethereum.send("eth_requestAccounts"); 

        //連接Metamask錢包
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        
        //和合約做互動
        const signer = provider.getSigner(); 
        const ContractAddress = con
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
        if(func === 'send'){
            transaction = await contract.setData(amount, rent, ipfsurl);
            setHash(transaction.hash)}
        else if(func==='returnd') {
            transaction = await contract.returnDeposit();
            setHash(transaction.hash)}
        else if(func==='withdraw') {
                transaction = await contract.withdraw();
                setHash(transaction.hash)}
    }

    async function send(event){
        event.preventDefault()
        setF('send')
        await pay(contract)
    }

    async function returnd(event){
        event.preventDefault()
        setF('returnd')
        await pay(contract)
    }

    async function withdraw(event){
        event.preventDefault()
        setF('withdraw')
        await pay(contract)
    }

    const copyToClipboard = () => {
        copy(hash);
        alert(`交易Hash複製成功~ "${hash}"`);
    }
    const selectcss = { option: (provided:any, state:any) => ({ ...provided, margin:'10px', }), control: (provided:any) => ({ ...provided, height: '48px !important', 'line-height': '2rem center', border: '#3f5269 solid 5px !important', 'background-color':"#ffeeb1", 'border-radius':'5rem'}), input:(provided:any)=>({ ...provided, 'margin-top':'-25px'}), dropdownIndicator: base => ({...base,color: "#363636" /*select 箭頭的顏色*/}) }

    return (
       <div style={{ backgroundImage: "url(/bg5.png)" }}> 
       <>
       
        <div className="tab" id="tab">
            <div className="tablist" id="tablist">
                <div className={`tabheadleft ${index===0?'active':null}`} onClick={ ()=>{setIndex(0);}}>
                    &nbsp;租屋資料&nbsp;
                </div>
                <div className={`tabheadmiddle ${index===1?'active':null}`} onClick={ ()=>{setIndex(1);} }>
                    &nbsp;&nbsp;收房租&nbsp;&nbsp;
                </div>
                <div className={`tabheadright ${index===2?'active':null}`} onClick={ ()=>{setIndex(2);} }>
                    &nbsp;&nbsp;退押金&nbsp;&nbsp;
                </div>
            </div>
        </div>
        
        <div className="tabcontent" hidden={index !== 0}>
        <form className="box" id="managesetdatabox">
        <div>
        <Select id="searchselect" options={options} onChange={handleSelected} placeholder= '選擇契約'theme={theme => ({...theme,colors: {...theme.colors,neutral50: '#363636',  /* Placeholder color*/},})} styles={selectcss} options={options} onChange={handleSelected} />
                
                <span className="icon is-small is-left" id="searchselecticon">
                </span>
        </div>
            <div className="field" >
                <label className="label" id="managelabel">押金:</label>
                <div class="control has-icons-left">
                    <div className="control">
                        <input id="paymentinput" value={rent} onChange={(event) => setRent(event.target.value)} className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                    <span className="icon is-left" id="paydepositinputicon">
                        <img src="ethereum.png" alt="quit"/>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label" id="managelabel">租金:</label>
                <div class="control has-icons-left">
                    <div className="control">
                        <input id="paymentinput" value={amount} onChange={(event) => setAmount(event.target.value)} className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                    <span className="icon is-left" id="paydepositinputicon">
                        <img src="ethereum.png" alt="quit"/>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label" id="managelabel">契約密文:</label>
                <div class="control has-icons-left">
                    <div className="control">
                        <input id="paymentinput" value={ipfsurl} onChange={(event) => setIpfsurl(event.target.value)}  className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                    <span className="icon is-left" id="filecipherinputicon">
                        <img src="lock.png" alt="quit"/>
                    </span>
                </div>
            </div>

            <div class="control has-icons-left">
                <button id="paydepositbutton" onClick={send} className="button is-warning">&nbsp;&nbsp;&nbsp;設定</button>
                <span className="icon is-left" id="setdataicon">
                    <img src="gear.png" alt="quit"/>
                </span>
            </div>
        </form>
            <div className="box" id="paymenthashbox">
                
                <div className="field">
                    <label className="label" id="managelabel">交易Hash:</label>
                    <div className="control">
                        <input id="paymentinput" value={hash} className="input is-warning" type="text" autocomplete="off"/>
                    </div>
                </div>

                <div className="paymentbutton">
                    <button id="copybutton" onClick={copyToClipboard} className="button is-warning">複製</button>
                </div>
            </div>
        </div>

        <div className="tabcontent"  hidden={index !== 1}>
            <div className="box" id="collectrentbox">
                <div class="control has-icons-left">
                    <div className="cdata">
                        <button id="collectrentbutton" onClick={withdraw} className="button is-warning">&nbsp;&nbsp;&nbsp;收房租</button>
                    </div>
                    <span className="icon is-left" id="collectrenticon">
                        <img src="eth.png" alt="quit"/>
                    </span>
                </div>

                <div className="field">
                    <label className="label" id="managelabel">交易Hash:</label>
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
            <div className="box" id="collectrentbox">
                <div class="control has-icons-left">
                    <div className="cdata">
                        <button id="collectrentbutton" onClick={returnd} className="button is-warning">&nbsp;&nbsp;&nbsp;退押金</button>
                    </div>
                    <span className="icon is-left" id="collectrenticon">
                        <img src="currency.png" alt="quit"/>
                    </span>
                </div>

                <div className="field">
                    <label className="label" id="managelabel">交易Hash:</label>
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
export default Manage