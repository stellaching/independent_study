/*
<Route path="/payment" element={<Payment />} />
<Route path="/encryption" element={<Encryption />} />

<Link className="navbar-item" href={Link} to="/payment">
  <FaEthereum color="#585858" size={50} />支付
</Link>
                      
<Link className="navbar-item" href={Link} to="/encryption">
  <RiLock2Fill color="#fffccd" size={50} />加密
</Link>    

style = {{transform: 'rotate(10deg)' }}
*/

import {React, useState} from "react";
import './App.css';
import 'bulma/css/bulma.min.css'
import { Auth0Context, useAuth0 } from '@auth0/auth0-react'

//做分頁的套件
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

//列表
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

//加icon
import {FcHome} from 'react-icons/fc'
import {FaEthereum} from 'react-icons/fa'
/*import {RiLock2Fill} from 'react-icons/ri'*/
import {IoIosUnlock} from 'react-icons/io'
import {MdFileUpload} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
import {FaBuilding} from 'react-icons/fa'
import {FaHouseUser} from 'react-icons/fa'
import {IoMdSettings} from 'react-icons/io'
import {RiKey2Fill} from 'react-icons/ri'
import {GrAddCircle} from 'react-icons/gr'
import {FcSearch} from 'react-icons/fc'

import { slideimg } from './components/Data'
import Home from './components/Home'; //首頁
import Login from './components/Login'; //登入
import Logout from './components/Logout'; //登出
//import Payment from './components/Payment' /*支付*/
//import Encryption from './components/Encryption' /*加密*/

//房客功能
import Payrent from './components/Payrent' //支付租金
import Decryption from "./components/Decryption"; //解密
import Renthouse from "./components/Renthouse";//租屋列表

//房東功能
import Upload from './components/Upload' //上傳
import Manage from './components/Manage' //租屋管理
import Newrent from './components/Newrent' //新增租屋
import Search from "./components/Search"; //查詢

//database
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, child, get,set, query, equalTo, push,orderByValue } from "firebase/database";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU1Q7UBa961dw3FLg6_fDDTFI5OeA7Aww",
  authDomain: "rent25db.firebaseapp.com",
  projectId: "rent25db",
  storageBucket: "rent25db.appspot.com",
  messagingSenderId: "608315600396",
  appId: "1:608315600396:web:c1394db33a67514a7dc829",
  measurementId: "G-81H0G28MSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//^database


function App() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  /*切換到房東的頁面*/
  const [owner, setOwner] = useState(true);
  function showowner() {
    setOwner(!owner);
  }
  //登入後才能顯示所有功能
  const {user,isAuthenticated } = useAuth0(); 
  /*已登入且身分是房客時*/
  if(isAuthenticated) {
    const dbRef = ref(getDatabase(app));
    const db=getDatabase(app);
    let email=user.email;
    let uname=user.sub;
    console.log(uname);
    get(child(dbRef,'user/'+uname)).then((snapshot) => {
      if(snapshot.exists()){
        console.log("aru");
      }else{
        set(ref(db,'user/'+uname),{email:email})
        .then(()=>{console.log("Add new user")})
        .catch((error)=>{console.error(error);});
      }
    });
    
      return(
        <>  
        <BrowserRouter>
            {owner ? (
                
                  <nav id="navbar" className="navbar is-warning" role="navigation" aria-label="main navigation">
                  <img src="logo.png" width="150"alt='logo' />
                  <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                      <Link className="navbar-item" href={Link} to="/">
                        <FcHome size={50} />首頁
                      </Link>

                      <List
                        sx={{ width: '100%', maxWidth:720,bgcolor: '#ffe08a' }}
                        component="navbar"
                        aria-labelledby="nested-list-subheader"
                        
                      >
                        <ListItemButton onClick={handleClick} >
                          <ListItemText primary="房東" />
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%', maxWidth: 360,bgcolor: '#ffe08a' }}>
                          <List component="div" disablePadding  >
                          <Link className="linkt" href={Link} to="/renthouse">
                            租屋
                          </Link>
                          <br></br>
                          <Link className="linkt" href={Link} to="/payrent" >
                            支付
                          </Link>
                          <br></br>
                          <Link className="linkt" href={Link} to="/decryption">
                            解密
                          </Link>
                          </List>
                        </Collapse>
                      </List>

                      <List
                        sx={{ width: '100%', maxWidth: 360,bgcolor: '#ffe08a' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        
                      >
                        <ListItemButton onClick={handleClick2}>
                          <ListItemText primary="房客" />
                        </ListItemButton>
                        <Collapse in={open2} timeout="auto" unmountOnExit sx={{ width: '100%', maxWidth: 360,bgcolor: '#ffe08a' }}>
                          <List component="div" disablePadding  >
                          <Link className="linkt" href={Link} to="/manage" >
                            管理
                          </Link>
                          <br></br>
                          <Link className="linkt" href={Link} to="/upload">
                            上傳
                          </Link>
                          <br></br>
                          <Link className="linkt" href={Link} to="/newrent">
                            新增
                          </Link>
                          <br></br>
                          <Link className="linkt" href={Link} to="/search">
                            查詢
                          </Link>
                          </List>
                        </Collapse>
                      </List>
                      
                      <Link className="navbar-item" href={Link} to="/renthouse" >
                        <RiKey2Fill size={60} color="#3ab7fc"/>租屋
                      </Link>
                      
                      <Link className="navbar-item" href={Link} to="/payrent" >
                        <FaEthereum size={50} color="#585858"/>支付
                      </Link>

                      <Link className="navbar-item" href={Link} to="/decryption">
                        <IoIosUnlock color="#fffccd" size={60} />解密
                      </Link>
                      <Logout />
                      <button id="lodgerbutton" onClick={showowner} className="button is-warning"><FaBuilding color="#3e2723" size={50} />我是房東</button>
                  
                      </div>
                    </div>
                  </nav>
                
                ) : (
                  
                  <nav id="navbar" className="navbar is-warning" role="navigation" aria-label="main navigation">
                  
                  <img src="logo.png" width="150" alt='logo' />
                  
                  <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                      <Link className="navbar-item" href={Link} to="/">
                        <FcHome size={50} />首頁
                      </Link>

                      <Link className="navbar-item" href={Link} to="/manage" >
                        <IoMdSettings size={48} color="#585858"/>管理
                      </Link>

                      <Link className="navbar-item" href={Link} to="/upload">
                        <MdFileUpload color="#88001b" size={50} />上傳
                      </Link>

                      <Link className="navbar-item" href={Link} to="/newrent">
                        <GrAddCircle size={45} /><span style = {{ fontFamily: 'Nishiki-teki', fontSize: '37px'}} >新增</span>
                      </Link>

                      <Link className="navbar-item" href={Link} to="/search">
                        <FcSearch size={50} /><span style = {{ fontFamily: 'Nishiki-teki', fontSize: '37px'}} >查詢</span>
                      </Link>
                      <Logout />
                      <button id="ownerbutton" onClick={showowner} className="button is-warning"><FaHouseUser color="#01579b" size={50} />我是房客</button>
                    </div>
                  </div>
                </nav>
                
                )}

              <div>
                <Routes>
                  <Route path="/" element={<Home images={slideimg}/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/decryption" element={<Decryption />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/payrent" element={<Payrent />} />
                  <Route path="/manage" element={<Manage />} />
                  <Route path="/newrent" element={<Newrent />} />
                  <Route path="/renthouse" element={<Renthouse />} />
                  <Route path="/search" element={<Search />}/>
                </Routes>
              </div>

              <div id="footer">
                <div className="container">
                  <p className="footer-text">Copyright © 2022 銘傳大學資工專研第25組</p>
                </div>
              </div>
            </BrowserRouter></>
      )
  }
  return (
    <>
    <BrowserRouter>
      <nav className="navbar is-warning" role="navigation" aria-label="main navigation">

        <img src="logo.png" width="150" alt='logo' />

        <div id="navbarBasicExample" class="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" href={Link} to="/">
              <FcHome />首頁
            </Link>

            <Link className="navbar-item" href={Link} to="/login">
              <FaUser color="#585858" size={32} />登入
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home images={slideimg}/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <div id="footer">
        <div className="container">
          <p className="footer-text">Copyright © 2022 銘傳大學資工專研第25組</p>
        </div>
      </div>
    </BrowserRouter></>
  );
}

export default App;
