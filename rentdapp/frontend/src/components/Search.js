//房東 查詢頁面
import React, {useState} from 'react';
import './Search.css'
import { ethers } from "ethers";
import Select from 'react-select'
import { useAuth0 } from '@auth0/auth0-react'
import { getDatabase, ref, onValue, get,set, query, equalTo, push,orderByValue,forEach as fe} from "firebase/database";

import {FaSearch} from 'react-icons/fa'
import {FaHouseUser} from 'react-icons/fa'

const Search = () => {
    const [index, setIndex] = useState(0)          //tab標籤

    const [func,setF] = useState('')
    const [message, setMessage] = useState('') 
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

    async function searchdata(con) {
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
        if(func==='checkd')
            setMessage(await contract.getData());
     
        else if(func==='checkm')
            setMessage(await contract.getBalance());
    }

    async function checkd(event){
        event.preventDefault()
        setF('checkd')
        await searchdata(contract)
    }
    
    async function checkm(event){
        event.preventDefault()
        setF('checkm')
        await searchdata(contract)
    }

    const selectcss = { option: (provided:any, state:any) => ({ ...provided, margin:'10px', }), control: (provided:any) => ({ ...provided, height: '48px !important', 'line-height': '2rem center', border: '#3f5269 solid 5px !important', 'background-color':"#ffeeb1", 'border-radius':'5rem'}), input:(provided:any)=>({ ...provided, 'margin-top':'-25px'}), dropdownIndicator: base => ({...base,color: "#363636" /*select 箭頭的顏色*/}) }

    return (
    <div style={{ backgroundImage: "url(/bg5.png)" }}>
    <>
   
    <div className="tab" id="searchtab">
        <div className="tablist" id="searchtablist">
            <div className={`searchtabheadleft ${index===0?'active':null}`} onClick={ ()=>{setIndex(0)} }>
                租屋資料
            </div>
            <div className={`searchtabheadright ${index===1?'active':null}`} onClick={ ()=>{setIndex(1)} }>
                合約餘額
            </div>
        </div>
    </div>

    <div className="tabcontent" hidden={index !== 0}>
        <form className="box" id="searchbox">
            <div class="control has-icons-left">
                <Select id="searchselect"  placeholder= '選擇契約'theme={theme => ({...theme,colors: {...theme.colors,neutral50: '#363636',  /* Placeholder color*/},})} styles={selectcss} options={options} onChange={handleSelected} />
                
                <span className="icon is-small is-left" id="searchselecticon">
                    <FaHouseUser size={33} color="#01579b"/>
                </span>
            </div>

            <div className="cdata">
                <div class="control has-icons-left">
                    <button id="searchbutton" onClick={checkd} className="button is-warning">&nbsp;&nbsp;&nbsp;查詢</button>
                    
                    <span className="icon is-small is-left" id="searchicon">
                        <FaSearch size={50} color="#000046"/>
                    </span>
                </div>
            </div>
            <div className="control">
                <input id="searchinput" value={message} className="input is-warning" type="text" autocomplete="off"/>
            </div>
            <br/><></>
            <br/><></>
            <br/><></>
        </form>
    </div>

    <div className="tabcontent"  hidden={index !== 1}>
    <form className="box" id="searchbox">
            <div class="control has-icons-left">
                <Select id="searchselect"  placeholder= '選擇契約'theme={theme => ({...theme,colors: {...theme.colors,neutral50: '#363636',  /* Placeholder color*/},})} styles={selectcss} options={options} onChange={handleSelected} />
                
                <span className="icon is-small is-left" id="searchselecticon">
                    <FaHouseUser size={33} color="#01579b"/>
                </span>
            </div>

            <div className="cdata">
                <div class="control has-icons-left">
                    <button id="searchbutton" onClick={checkm} className="button is-warning">&nbsp;&nbsp;&nbsp;查詢</button>
                    
                    <span className="icon is-small is-left" id="searchicon">
                        <FaSearch size={50} color="#000046"/>
                    </span>
                </div>
            </div>
            <div className="control">
                <input id="searchinput" value={message} className="input is-warning" type="text" autocomplete="off"/>
            </div>
            <br/><></>
            <br/><></>
            <br/><></>
        </form>
    </div>
    
    </>
    </div>
  )
}

export default Search