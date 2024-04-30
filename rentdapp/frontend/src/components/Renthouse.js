//房客 租屋頁面 
import React, {useState} from "react";
import "./Renthouse.css"

import Select from 'react-select'
import { ethers } from "ethers";
//複製按鈕套件
import copy from "copy-to-clipboard";
import { getStorage,ref as refs,uploadBytes} from "firebase/storage";
import { useAuth0 } from '@auth0/auth0-react'
import { getDatabase, ref ,onValue, get,child, set, query, equalTo, push,update } from "firebase/database";
import {RiFileLockLine} from 'react-icons/ri'
import {FaHouseUser} from 'react-icons/fa'
import { RiUserUnfollowFill } from "react-icons/ri";

function Renthouse () {
    const [index, setIndex] = useState(0)         //tab標籤
    const [rth,setRth] = useState('')             //退租
    const [contract, setContract] = useState('') 
    const [scontract,setScontract] = useState('') //租屋智能合約
    const[rname,setRname] = useState('')          //租屋名稱
    const [owner,setOwer] = useState('')
    const [stat,setStat] = useState('')
    const [message, setMessage] = useState('') 
    const [rentlist,setRentl] =useState([]);
    const {user} = useAuth0(); 
    let uname=user.sub;
    const storage = getStorage();
    const db=getDatabase();
    const dbRef = ref(getDatabase());
    get(child(dbRef,'user/'+uname)).then((snapshot) => {
        if(snapshot.val().rent!==""){
          console.log("has rent");
          setContract(snapshot.val().rent);
          setRth(snapshot.val().owner);
        }else{setContract('0xf4038882Be4f8f7D67eF1A4202C9CbfF7A54f399');}
      });

    async function rent(event) {
        event.preventDefault()
        if(stat==="空"){
        const found = owner.find(obj => {
            return obj.label === scontract;
          });
        //console.log(found.value);
        update(ref(db,'user/'+uname),{owner:found.value});
        update(ref(db,'user/'+uname),{rent:scontract});
        update(ref(db,'renthouse/'+found.value+'/'+scontract),{stat:'已出租'});
        }
        else{alert("已出租，請瀏覽其他租屋")}
    }

    //取已有合約的地址加進列表
    onValue(ref(db,'renthouse/'),(snapshot) => {
        var tt=[];
        var ow=[];
        snapshot.forEach((item)=>{
            let own=item.key
            //console.log(item.key)
            onValue(ref(db,'renthouse/'+own),(snapshots) => {
                snapshots.forEach((items)=>{
                    let newr={value:items.key,label:items.val().name};
                    let owne={value:own,label:items.key}
                    tt.push(newr);
                    ow.push(owne);
                });
                setRentl(tt);
                setOwer(ow);
            });
        });
          
        
    }
    ,{onlyOnce:true}
    );
    const options =rentlist;
    
    const handleSelected = (e) => {
        //console.log('label'+e.label);
        setScontract(e.value);
        setRname(e.label)
        getCon(e.value);
        const found = owner.find(obj => {
            return obj.label === scontract;
          });
        onValue(ref(db,'renthouse/'+found.value+'/'+e.value),(snapshot) => {
            let ss=snapshot.val().stat;
            console.log(ss);
            setStat(ss);
        });
        
    }

    async function getCon(con) {
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
        let mes = await contract.getData();
        mes = mes.toString();
        let dn=mes.indexOf(', de');
        let cn=mes.indexOf(', con');
        var rt=mes.substring(6,dn);
        var dp=mes.substring(dn+11,cn);
        setMessage({rent:rt,deposit:dp});
    }

    //退租
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

    const selectcss = { option: (provided, stat) => ({ ...provided, margin:'10px', }), control: (provided) => ({ ...provided, height: '48px !important', 'line-height': '2rem center', border: '#3f5269 solid 5px !important', 'background-color':"#ffeeb1", 'border-radius':'5rem'}), input:(provided)=>({ ...provided, 'margin-top':'-25px'}), dropdownIndicator: base => ({...base,color: "#363636" /*select 箭頭的顏色*/}) }
    return (
       <div style={{ backgroundImage: "url(/bg5.png)" }}> 
       <>
       
        <div className="tab" id="tab">
            <div className="tablist" id="tablist">
                <div className={`tabheadleft ${index===0?'active':null}`} onClick={ ()=>{setIndex(0)} }>
                    &nbsp;&nbsp;租屋&nbsp;&nbsp;
                </div>
                <div className={`tabheadright ${index===1?'active':null}`} onClick={ ()=>{setIndex(1)} }>
                    &nbsp;&nbsp;退租&nbsp;&nbsp;
                </div>
            </div>
        </div>

        <div className="tabcontent" hidden={index !== 0}>
            <form className="box" id="renthousebox">
                <div class="control has-icons-left">
                    <Select id="renthouseselect"  placeholder= '選擇租屋'theme={theme => ({...theme,colors: {...theme.colors,neutral50: '#363636',  /* Placeholder color*/},})} styles={selectcss} options={options} onChange={handleSelected} />
                    
                    <span className="icon is-small is-left" id="renthouseselecticon">
                        <FaHouseUser size={33} color="#01579b"/>
                    </span>
                </div>
                <div className="field">
                    <label className="label" id="renthouselabel">房屋名稱:</label>
                    <div className="control">
                        <input value={rname} id="renthouseinput" autoComplete="off" type="text" className="input is-warning"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" id="renthouselabel">押金:</label>
                    <div className="control">
                        <input value={message.deposit} id="renthouseinput" autoComplete="off" type="text" className="input is-warning"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" id="renthouselabel">房租:</label>
                    <div className="control">
                        <input value={message.rent} id="renthouseinput" autoComplete="off" type="text" className="input is-warning"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" id="renthouselabel">智能合約地址:</label>
                    <div className="control">
                        <input value={scontract} onChange={null} id="renthouseinput" autoComplete="off" type="text" className="input is-warning"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" id="renthouselabel">出租狀態:</label>
                    <div className="control">
                        <input value={stat} id="renthouseinput" autoComplete="off" type="text" className="input is-warning"/>
                    </div>
                </div>

                <div class="control has-icons-left">
                    <button id="confirmrentalbutton" onClick={rent} className="button is-warning">&nbsp;&nbsp;&nbsp;&nbsp;決定租屋</button>
                    
                    <span className="icon is-left" id="confirmrentalicon">
                        <img id="renthouseicon" src="door.png" alt="quit"/>
                    </span>
                </div>
            </form>
        </div>

        <div className="tabcontent"  hidden={index !== 1}>
            <div class="control has-icons-left">
                <button id="quitleasebutton" onClick={rtrt} className="button is-warning">&nbsp;&nbsp;退租</button>
                
                <span className="icon is-left" id="quitleaseicon">
                    <img src="gold.png" alt="quit"/>
                </span>
            </div>
        </div>
        
       </> 
       </div>
    )
}
export default Renthouse