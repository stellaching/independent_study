//SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract house{
    event Deposit(uint amount);
    event Withdraw(uint amount);
    uint public rent;
    uint public rdeposit;
    address payable public tenantAddr;
    address payable public ownerAddr;
    string private rentcontract;
    string private signedcontract;
    bool pd=false;

    //address payable public owner = payable(msg.sender);
    //限制只有房東才能用
    modifier onlyOwner(){
        require(
           msg.sender==ownerAddr,
           "not ower" 
        );
        _;
    }
    //限制只有租客才能用
    modifier onlyTenant(){
        require(
           msg.sender==tenantAddr,
           "not tenant" 
        );
        _;
    }
    //租客上傳契約地址，把租客錢包放進合約
    function signcontractT(string memory sc) public {
        require(pd==false,"already have tenant");
        signedcontract=sc;
        tenantAddr=payable(msg.sender);
        pd==true;
    } 
    //屋主上傳契約地址
    function signcontractO(string memory sc) public onlyOwner{
        signedcontract=sc;
    }

    //付押金，限制只能付跟合約設定一樣的金額
    function payDeposit() payable public onlyTenant{
        require(msg.value==rdeposit,"not same as deposit value");
        tenantAddr=payable(msg.sender);
        emit Deposit(msg.value);        
    } 
    //付租金，限制只能付跟合約設定一樣的金額
    function payRent()payable public onlyTenant{
        require(msg.value==rent,"not same as rent value");
        emit Deposit(msg.value);
    }

    //返還押金
    function returnDeposit() public onlyOwner{
        tenantAddr.transfer(rdeposit);
        pd=false;
    }

    //查詢合約存有的金額
    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    //把合約內的錢扣除押金後轉給屋主
    function withdraw() public onlyOwner{
        ownerAddr.transfer(address(this).balance-rdeposit);
        emit Withdraw(address(this).balance-rdeposit);
    }

    //設定押金﹑租金﹑租屋契約，有租客後不得更改
    function setData(uint r,uint rd,string memory rc) public {
        require(pd==false,"Contract is running,nothing should be change.");
        rent=r;
        rdeposit=rd;
        rentcontract= rc;
    }

    //查詢押金﹑租金﹑租屋契約
    function getData() public view returns (string memory,uint,string memory,uint,string memory,string memory){
        //require(pd==false,"Contract is running,others should not see.");
        return ("rent:",rent," deposit:",rdeposit," contract:",rentcontract);
    }

    function getDataForT() public view onlyTenant returns (string memory,uint,string memory,uint,string memory,string memory){
        return ("rent:",rent," deposit:",rdeposit," contract:",signedcontract);
    }

    function getDataForO() public view onlyOwner returns (string memory,uint,string memory,uint,string memory,string memory){
        return ("rent:",rent," deposit:",rdeposit," contract:",signedcontract);
    }

}